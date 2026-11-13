#!/usr/bin/env node
/**
 * Downloads the Sherubtse College webmap (a QGIS2Web / OpenLayers export)
 * so it can be viewed and edited offline.
 *
 *   node scripts/download_map.js            -> downloads into ./webmap
 *   node scripts/download_map.js original   -> downloads into ./original
 *
 * Never touches the webmap/inventory/ folder, so your furniture/equipment
 * layer survives a re-download. Run build_inventory.js afterwards to
 * re-attach the inventory layer to the fresh index.html.
 *
 * Some networks cannot resolve finalmap.sherubtse.edu.bt with the local DNS,
 * so if the normal lookup fails this falls back to public DNS (8.8.8.8 / 1.1.1.1).
 * HTTPS certificate checking stays ON.
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const dns = require('dns');

const HOST = 'finalmap.sherubtse.edu.bt';
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, process.argv[2] || 'webmap');

const publicDns = new dns.Resolver();
publicDns.setServers(['8.8.8.8', '1.1.1.1']);

function lookup(hostname, options, cb) {
  dns.lookup(hostname, options, (err, address, family) => {
    if (!err) return cb(null, address, family);
    publicDns.resolve4(hostname, (err2, addrs) => {
      if (err2 || !addrs.length) return cb(err);
      if (options && options.all) return cb(null, addrs.map(a => ({ address: a, family: 4 })));
      cb(null, addrs[0], 4);
    });
  });
}

function get(urlPath) {
  return new Promise((resolve, reject) => {
    const req = https.get({ host: HOST, path: '/' + urlPath.replace(/^\.?\//, ''), lookup, timeout: 60000 }, res => {
      if (res.statusCode !== 200) { res.resume(); return reject(new Error(`HTTP ${res.statusCode}`)); }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
  });
}

async function save(rel) {
  rel = rel.replace(/^\.?\//, '').split(/[?#]/)[0];
  const buf = await get(rel);
  const dest = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, buf);
  return buf;
}

(async () => {
  console.log(`Downloading https://${HOST}/ -> ${OUT}`);
  const index = (await save('index.html')).toString('utf8');

  const refs = new Set();
  for (const m of index.matchAll(/(?:src|href)="(\.?\/?(?:resources|layers|styles)\/[^"]+)"/g)) refs.add(m[1]);
  const failed = [];
  const fetchAll = async list => {
    for (const r of list) {
      try { await save(r); process.stdout.write('.'); }
      catch (e) { failed.push(`${r} (${e.message})`); process.stdout.write('x'); }
    }
  };
  await fetchAll([...refs]);

  // Second pass: legend icons referenced from layers.js, fonts from CSS.
  const extra = new Set();
  const layersJs = path.join(OUT, 'layers', 'layers.js');
  if (fs.existsSync(layersJs)) {
    for (const m of fs.readFileSync(layersJs, 'utf8').matchAll(/styles\/legend\/[^"']+\.png/g)) extra.add(m[0]);
  }
  for (const css of fs.readdirSync(path.join(OUT, 'resources')).filter(f => f.endsWith('.css'))) {
    const t = fs.readFileSync(path.join(OUT, 'resources', css), 'utf8');
    for (const m of t.matchAll(/url\(["']?\.\.\/([^)"'?#]+)/g)) extra.add(m[1]);
  }
  await fetchAll([...extra]);

  console.log(`\nDone: ${refs.size + extra.size + 1 - failed.length} files saved.`);
  if (failed.length) {
    console.log(`${failed.length} could not be downloaded (some are also missing on the live site, e.g. FontAwesome fonts):`);
    failed.forEach(f => console.log('  - ' + f));
  }
})().catch(e => { console.error('Download failed:', e.message); process.exit(1); });
