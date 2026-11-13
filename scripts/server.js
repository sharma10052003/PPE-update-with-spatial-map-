#!/usr/bin/env node
/**
 * Runs the map + PPE admin.
 *
 *   npm start            (or: node scripts/server.js)
 *
 *   Map:    http://localhost:8080/
 *   Admin:  http://localhost:8080/admin/
 *
 * Settings live in config.json (created on first run), or environment
 * variables on a server (PPE_EXCEL_FILE, PORT, HOST, ADMIN_PASSWORD):
 *   excelFile      the PPE sheet that entries are saved into
 *   port, host     host "127.0.0.1" = only this computer can open it;
 *                  "0.0.0.0" = other computers can too
 *   adminPassword  the admin page and all saving need user "admin" + this
 *                  password. Required whenever the site can be reached from
 *                  other computers (host not 127.0.0.1, or behind a web proxy).
 *
 * The map itself (and the read-only /api/assets list) is public.
 */
const fs = require('fs');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const { ROOT, WEBMAP } = require('./lib');
const ppe = require('./ppe');

const cfg = ppe.loadConfig();
const ADMIN_DIR = path.join(ROOT, 'admin');
const LOOPBACK = ['127.0.0.1', '::1', 'localhost'];
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.ico': 'image/x-icon',
};

// ------------------------------------------------------------------ auth
/** The real visitor: behind Apache/nginx the socket is the proxy, so use X-Forwarded-For. */
function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  return fwd ? String(fwd).split(',')[0].trim() : req.socket.remoteAddress;
}
const isLocal = req => !req.headers['x-forwarded-for'] &&
  ['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(req.socket.remoteAddress);

// Lock an IP out for 15 minutes after 10 wrong passwords.
const failures = new Map();
const LOCK_MS = 15 * 60 * 1000, MAX_FAILS = 10;
function lockedOut(ip) {
  const f = failures.get(ip);
  if (!f) return false;
  if (Date.now() - f.first > LOCK_MS) { failures.delete(ip); return false; }
  return f.count >= MAX_FAILS;
}
function recordFailure(ip) {
  const f = failures.get(ip);
  if (!f || Date.now() - f.first > LOCK_MS) failures.set(ip, { first: Date.now(), count: 1 });
  else f.count++;
}
function safeEqual(a, b) {
  const ha = crypto.createHash('sha256').update(String(a)).digest();
  const hb = crypto.createHash('sha256').update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

/** Returns null if allowed, otherwise sends the refusal and returns true. */
function requireAdmin(req, res) {
  if (!cfg.adminPassword) {
    if (isLocal(req)) return null;
    json(res, 403, { error: 'The admin page is only available on the server computer. Set an admin password to allow others.' });
    return true;
  }
  const ip = clientIp(req);
  if (lockedOut(ip)) {
    json(res, 429, { error: 'Too many wrong passwords. Try again in 15 minutes.' });
    return true;
  }
  const m = /^Basic (.+)$/.exec(req.headers.authorization || '');
  if (m) {
    const [user, ...rest] = Buffer.from(m[1], 'base64').toString().split(':');
    if (safeEqual(user, 'admin') & safeEqual(rest.join(':'), cfg.adminPassword)) {
      failures.delete(ip);
      return null;
    }
    recordFailure(ip);
  }
  res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="PPE admin", charset="UTF-8"', 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Admin login required (user: admin).' }));
  return true;
}

// --------------------------------------------------------------- helpers
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'same-origin',
};
function json(res, status, body) {
  res.writeHead(status, { ...SECURITY_HEADERS, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}
function readRaw(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0; const chunks = [];
    req.on('data', c => {
      size += c.length;
      if (size > limit) { reject(Object.assign(new Error(`File too large (max ${Math.round(limit / 1e6)} MB).`), { status: 413 })); req.destroy(); }
      else chunks.push(c);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}
async function readJson(req) {
  try { return JSON.parse((await readRaw(req, 1e6)).toString('utf8') || '{}'); }
  catch (e) { throw Object.assign(new Error(e.status ? e.message : 'Invalid JSON'), { status: e.status || 400 }); }
}
function serveFile(res, base, rel) {
  let file;
  try { file = path.normalize(path.join(base, decodeURIComponent(rel))); } catch (e) { res.writeHead(400); return res.end(); }
  if (file !== base && !file.startsWith(base + path.sep)) { res.writeHead(403); return res.end(); }
  fs.stat(file, (err, st) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain' }); return res.end('Not found'); }
    if (st.isDirectory()) return serveFile(res, base, path.join(rel, 'index.html'));
    res.writeHead(200, { ...SECURITY_HEADERS, 'Content-Type': MIME[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    fs.createReadStream(file).pipe(res);
  });
}

// ------------------------------------------------------------------- API
async function handleApi(req, res, url) {
  const p = url.pathname;
  if (req.method === 'GET' && p === '/api/assets') return json(res, 200, { assets: await ppe.readAssets() });
  if (req.method === 'GET' && p === '/api/meta') {
    return json(res, 200, {
      places: ppe.placeList(), categories: ppe.CATEGORIES, conditions: ppe.CONDITIONS,
      excelFile: path.basename(ppe.excelPath()),
    });
  }

  if (requireAdmin(req, res)) return;
  // Changes must come from the admin page itself (blocks cross-site form posts).
  if (req.method !== 'GET' && req.headers['x-ppe-admin'] !== '1') return json(res, 403, { error: 'Missing admin header.' });

  if (req.method === 'GET' && p === '/api/excel') {
    res.writeHead(200, {
      ...SECURITY_HEADERS,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${path.basename(ppe.excelPath()).replace(/"/g, '')}"`,
      'Cache-Control': 'no-store',
    });
    return fs.createReadStream(ppe.excelPath()).pipe(res);
  }
  if (req.method === 'POST' && p === '/api/assets') return json(res, 201, { asset: await ppe.addAsset(await readJson(req)) });
  if (req.method === 'POST' && p === '/api/import') {
    const mode = url.searchParams.get('mode') === 'replace' ? 'replace' : 'append';
    const dryRun = url.searchParams.get('dryRun') === '1';
    const buf = await readRaw(req, 20e6);
    if (!buf.length) return json(res, 400, { error: 'No file received.' });
    return json(res, 200, await ppe.importAssets(buf, { mode, dryRun }));
  }
  const m = /^\/api\/assets\/(\d+)$/.exec(p);
  if (m && req.method === 'PUT') return json(res, 200, { asset: await ppe.updateAsset(Number(m[1]), await readJson(req)) });
  if (m && req.method === 'DELETE') { await ppe.deleteAsset(Number(m[1])); return json(res, 200, { ok: true }); }
  json(res, 404, { error: 'Unknown API route' });
}

const server = http.createServer(async (req, res) => {
  let url;
  try { url = new URL(req.url, 'http://x'); } catch (e) { res.writeHead(400); return res.end(); }
  try {
    if (url.pathname.startsWith('/api/')) return await handleApi(req, res, url);
    if (url.pathname === '/admin') { res.writeHead(301, { Location: '/admin/' }); return res.end(); }
    if (url.pathname.startsWith('/admin/')) {
      if (requireAdmin(req, res)) return;
      return serveFile(res, ADMIN_DIR, url.pathname.slice('/admin/'.length));
    }
    return serveFile(res, WEBMAP, url.pathname.slice(1));
  } catch (e) {
    if (!e.status) console.error(e);
    if (!res.headersSent) json(res, e.status || 500, { error: e.status ? e.message : 'Server error: ' + e.message });
  }
});

// ----------------------------------------------------------------- start
if (!fs.existsSync(ppe.excelPath())) {
  const template = path.join(ROOT, 'data', 'PPE-template.xlsx');
  if (fs.existsSync(template)) {
    fs.mkdirSync(path.dirname(ppe.excelPath()), { recursive: true });
    fs.copyFileSync(template, ppe.excelPath());
    console.log(`Created a new, empty PPE register from the template: ${ppe.excelPath()}`);
  } else {
    console.error(`Excel file not found: ${ppe.excelPath()}\nSet "excelFile" in config.json.`);
    process.exit(1);
  }
}
const exposed = !LOOPBACK.includes(cfg.host);
if (exposed && !cfg.adminPassword) {
  console.error(`Refusing to start: host is "${cfg.host}" (reachable from other computers) but no adminPassword is set.\n` +
    'Set "adminPassword" in config.json (or the ADMIN_PASSWORD environment variable), or use host "127.0.0.1".');
  process.exit(1);
}
if (cfg.adminPassword && cfg.adminPassword.length < 10) {
  console.warn('Warning: adminPassword is shorter than 10 characters. Use a longer one for internet use.');
}
ppe.publish().then(() => {
  server.listen(cfg.port, cfg.host, () => {
    console.log(`Excel sheet: ${ppe.excelPath()}`);
    if (exposed) {
      const ips = Object.values(require('os').networkInterfaces()).flat()
        .filter(i => i && i.family === 'IPv4' && !i.internal).map(i => i.address);
      console.log('Reachable from other computers at:');
      ips.forEach(ip => console.log(`  Map:   http://${ip}:${cfg.port}/      Admin: http://${ip}:${cfg.port}/admin/`));
    }
    console.log(`On this computer:  Map: http://localhost:${cfg.port}/   Admin: http://localhost:${cfg.port}/admin/`);
    console.log(cfg.adminPassword ? 'Admin login: user "admin" + the password from config.' : 'Admin page: this computer only (no password set).');
    console.log('Press Ctrl+C to stop.');
  });
}).catch(e => { console.error('Could not read the Excel file:', e.message); process.exit(1); });
