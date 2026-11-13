/**
 * PPE register helpers: read/write the Excel sheet
 * ("PPE update 2026-2027.xlsx" format) and publish it to the map.
 *
 * Sheet layout (row 1 = headers, data from row 2):
 *   A Sl. No. | B Asset Code / Tag No. | C Asset Description | D Category
 *   E Location (= building name on the map) | F Custodian/Room | G Date of Purchase
 *   H Cost (Nu.) | I Qty Found Physically | J Condition | K Remarks
 */
const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const { ROOT, WEBMAP, loadPlaces } = require('./lib');

const CONFIG_PATH = path.join(ROOT, 'config.json');
const DEFAULT_CONFIG = {
  excelFile: 'data/PPE update 2026-2027.xlsx',
  port: 8080,
  host: '127.0.0.1',
  adminPassword: '',
};

/** config.json, overridable by environment variables (handy on a web server):
 *  PPE_EXCEL_FILE, PORT, HOST, ADMIN_PASSWORD */
function loadConfig() {
  if (!fs.existsSync(CONFIG_PATH)) fs.writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2) + '\n');
  const cfg = { ...DEFAULT_CONFIG, ...JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')) };
  const env = process.env;
  if (env.PPE_EXCEL_FILE) cfg.excelFile = env.PPE_EXCEL_FILE;
  if (env.PORT) cfg.port = Number(env.PORT);
  if (env.HOST) cfg.host = env.HOST;
  if (env.ADMIN_PASSWORD) cfg.adminPassword = env.ADMIN_PASSWORD;
  return cfg;
}
const excelPath = () => path.resolve(ROOT, loadConfig().excelFile);

const FIELDS = ['sl', 'code', 'description', 'category', 'location', 'room', 'date', 'cost', 'qty', 'condition', 'remarks'];
const HEADERS = ['Sl. No.', 'Asset Code / Tag No.', 'Asset Description',
  'Category (Land, Building, Furniture, Equipment, Vehicle, etc.)', 'Location', 'Custodian/Room',
  'Date of Purchase', 'Cost (Nu.)', 'Qty Found Physically', 'Condition (Good / Repairable / Unserviceable)', 'Remarks'];
const CATEGORIES = ['Furniture', 'Equipment', 'Building', 'Land', 'Vehicle', 'Other'];
const CONDITIONS = ['Good', 'Repairable', 'Unserviceable'];

// ------------------------------------------------------------------ places
let placesCache = null;
function places() {
  if (!placesCache) placesCache = loadPlaces();
  return placesCache;
}
/** Building names for the dropdown: identical to the names shown on the map. */
function placeList() {
  return places().map(p => ({ key: p.key, layer: p.layerTitle }));
}
/** Match a typed building name to a map name, ignoring case, spaces and punctuation
 *  ("degree hall-2" -> "Degree Hall 2", "Mother Peters Hall" -> "Mother Peter's Hall"). */
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9#]+/g, '');
function matchPlace(name) {
  const n = norm(name);
  if (!n) return null;
  return places().find(p => norm(p.key) === n) || null;
}

// ------------------------------------------------------------------ excel
function cellText(v) {
  if (v === null || v === undefined) return '';
  if (v instanceof Date) return v;
  if (typeof v === 'object') {
    if (v.richText) return v.richText.map(t => t.text).join('');
    if ('result' in v) return cellText(v.result);
    if (v.text !== undefined) return String(v.text);
    return '';
  }
  return v;
}
const isoDate = d => (d instanceof Date && !isNaN(d) ? d.toISOString().slice(0, 10) : '');

async function openBook() {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(excelPath());
  return { wb, ws: wb.worksheets[0] };
}

function rowToAsset(row) {
  const a = { row: row.number };
  FIELDS.forEach((f, i) => { a[f] = cellText(row.getCell(i + 1).value); });
  if (FIELDS.slice(1).every(f => a[f] === '')) return null; // blank (styled-only) row
  if (typeof a.date === 'number' && a.date > 1000) a.date = new Date(Math.round((a.date - 25569) * 86400000)); // Excel serial date
  a.date = a.date instanceof Date ? isoDate(a.date) : String(a.date || '').trim();
  a.sl = a.sl === '' ? null : Number(a.sl);
  a.cost = a.cost === '' ? null : Number(a.cost);
  a.qty = a.qty === '' ? 0 : Number(a.qty) || 0;
  ['code', 'description', 'category', 'location', 'room', 'condition', 'remarks'].forEach(f => { a[f] = String(a[f]).trim(); });
  const p = matchPlace(a.location);
  a.building = p ? p.key : null; // null = Location doesn't match a building on the map
  return a;
}

async function readAssets() {
  const { ws } = await openBook();
  const out = [];
  ws.eachRow({ includeEmpty: false }, row => {
    if (row.number === 1) return;
    const a = rowToAsset(row);
    if (a) out.push(a);
  });
  return out;
}

/** Validate + normalise data coming from the admin form. Throws on bad input. */
function clean(input) {
  const s = v => String(v === undefined || v === null ? '' : v).trim();
  const out = {
    code: s(input.code), description: s(input.description), category: s(input.category),
    location: s(input.location), room: s(input.room), date: s(input.date),
    cost: s(input.cost), qty: s(input.qty), condition: s(input.condition), remarks: s(input.remarks),
  };
  const errors = [];
  const place = matchPlace(out.location);
  if (!place) errors.push('Choose a building from the list.');
  else out.location = place.key;
  if (!out.description) errors.push('Asset Description is required.');
  if (!out.category) errors.push('Category is required.');
  if (out.qty === '') out.qty = '1';
  if (!/^\d+$/.test(out.qty)) errors.push('Qty must be a whole number.');
  if (out.cost !== '' && !(Number(out.cost.replace(/,/g, '')) >= 0)) errors.push('Cost must be a number.');
  if (out.date && !/^\d{4}-\d{2}-\d{2}$/.test(out.date)) errors.push('Date must be YYYY-MM-DD.');
  if (errors.length) { const e = new Error(errors.join(' ')); e.status = 400; throw e; }
  out.qty = Number(out.qty);
  out.cost = out.cost === '' ? null : Number(out.cost.replace(/,/g, ''));
  return out;
}

function writeRow(row, sl, a) {
  const vals = [sl, a.code, a.description, a.category, a.location, a.room,
    a.date ? new Date(a.date + 'T00:00:00Z') : null, a.cost, a.qty, a.condition, a.remarks];
  vals.forEach((v, i) => { row.getCell(i + 1).value = v === '' ? null : v; });
  row.getCell(7).numFmt = 'dd/mm/yyyy';
  row.getCell(8).numFmt = '#,##0.00';
  row.commit();
}

async function save(wb) {
  const file = excelPath();
  const tmp = file + '.tmp';
  await wb.xlsx.writeFile(tmp);
  try {
    fs.renameSync(tmp, file);
  } catch (e) {
    fs.rmSync(tmp, { force: true });
    if (['EBUSY', 'EPERM', 'EACCES'].includes(e.code)) {
      const err = new Error('The Excel file is open in another program (probably Excel). Close it and try again.');
      err.status = 409; throw err;
    }
    throw e;
  }
}

function lastDataRow(ws) {
  let last = 1, maxSl = 0;
  ws.eachRow({ includeEmpty: false }, row => {
    if (row.number === 1) return;
    const a = rowToAsset(row);
    if (a) { last = row.number; if (a.sl > maxSl) maxSl = a.sl; }
  });
  return { last, maxSl };
}
function findRowBySl(ws, sl) {
  let found = null;
  ws.eachRow({ includeEmpty: false }, row => {
    if (row.number > 1 && Number(cellText(row.getCell(1).value)) === Number(sl)) found = row;
  });
  if (!found) { const e = new Error(`No record with Sl. No. ${sl}.`); e.status = 404; throw e; }
  return found;
}

// Serialise writes so two admins saving at once can't clobber each other.
let queue = Promise.resolve();
const serial = fn => (queue = queue.then(fn, fn));

const addAsset = input => serial(async () => {
  const a = clean(input);
  const { wb, ws } = await openBook();
  const { last, maxSl } = lastDataRow(ws);
  writeRow(ws.getRow(last + 1), maxSl + 1, a);
  await save(wb);
  await publish();
  return { sl: maxSl + 1, ...a };
});
const updateAsset = (sl, input) => serial(async () => {
  const a = clean(input);
  const { wb, ws } = await openBook();
  writeRow(findRowBySl(ws, sl), Number(sl), a);
  await save(wb);
  await publish();
  return { sl: Number(sl), ...a };
});
const deleteAsset = sl => serial(async () => {
  const { wb, ws } = await openBook();
  ws.spliceRows(findRowBySl(ws, sl).number, 1);
  await save(wb);
  await publish();
});

// ------------------------------------------------------------ bulk import
/** Which column of an uploaded sheet holds which field, by header text. */
const HEADER_RULES = [
  ['sl', /^(sl|s\.?\s*no|serial)/i], ['code', /code|tag/i], ['description', /descr/i],
  ['category', /categ/i], ['location', /location|building|block/i], ['room', /custodian|room/i],
  ['date', /date/i], ['cost', /cost|amount|price|value/i], ['qty', /qty|quantity/i],
  ['condition', /condition|status/i], ['remarks', /remark|note/i],
];
function mapHeaders(row) {
  const map = {};
  row.eachCell((cell, col) => {
    const h = String(cellText(cell.value) || '').trim();
    if (!h) return;
    const rule = HEADER_RULES.find(([f, re]) => !(f in map) && re.test(h));
    if (rule) map[rule[0]] = col;
  });
  return map;
}

/**
 * Import rows from an uploaded PPE workbook (Buffer).
 * mode: 'append' adds after existing rows; 'replace' clears the register first.
 * dryRun: only check, don't save. Rows with problems are skipped and reported.
 */
const importAssets = (buffer, { mode = 'append', dryRun = false } = {}) => serial(async () => {
  const up = new ExcelJS.Workbook();
  try { await up.xlsx.load(buffer); } catch (e) {
    const err = new Error('That file could not be read as an Excel (.xlsx) workbook.'); err.status = 400; throw err;
  }
  // Find the sheet + header row (within the first 15 rows) that has Description and Location columns.
  let ws = null, headerRow = 0, cols = null;
  for (const sheet of up.worksheets) {
    for (let r = 1; r <= Math.min(15, sheet.rowCount); r++) {
      const m = mapHeaders(sheet.getRow(r));
      if (m.description && m.location) { ws = sheet; headerRow = r; cols = m; break; }
    }
    if (ws) break;
  }
  if (!ws) {
    const err = new Error('No header row with "Asset Description" and "Location" columns was found. Use the PPE sheet format.');
    err.status = 400; throw err;
  }

  const valid = [], problems = [];
  for (let r = headerRow + 1; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    const raw = {};
    for (const f of Object.keys(cols)) raw[f] = cellText(row.getCell(cols[f]).value);
    if (Object.entries(raw).every(([f, v]) => f === 'sl' || v === '' || v === null)) continue; // blank row
    if (typeof raw.date === 'number' && raw.date > 1000) raw.date = new Date(Math.round((raw.date - 25569) * 86400000));
    if (raw.date instanceof Date) raw.date = isoDate(raw.date);
    else if (raw.date) {
      const m = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/.exec(String(raw.date).trim()); // dd/mm/yyyy text
      raw.date = m ? `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}` : String(raw.date).trim();
    }
    if (raw.qty === '' || raw.qty === null || raw.qty === undefined) raw.qty = 1;
    if (!raw.category) raw.category = 'Other';
    try {
      valid.push({ excelRow: r, ...clean(raw) });
    } catch (e) {
      problems.push({ excelRow: r, location: String(raw.location || ''), description: String(raw.description || ''), error: e.message });
    }
  }

  const summary = {
    sheet: ws.name, rowsFound: valid.length + problems.length, valid: valid.length, problems,
    buildings: [...new Set(valid.map(a => a.location))].length, mode, imported: 0,
  };
  if (dryRun || !valid.length) return summary;

  const { wb, ws: reg } = await openBook();
  let { last, maxSl } = lastDataRow(reg);
  if (mode === 'replace') {
    if (last > 1) reg.spliceRows(2, last - 1);
    last = 1; maxSl = 0;
  }
  valid.forEach((a, i) => writeRow(reg.getRow(last + 1 + i), maxSl + 1 + i, a));
  await save(wb);
  await publish();
  summary.imported = valid.length;
  return summary;
});

// ---------------------------------------------------------- map publishing
/** Writes webmap/inventory/inventory_data.js so the map also works when opened as a plain file. */
async function publish(assets) {
  assets = assets || await readAssets();
  const round = g => JSON.parse(JSON.stringify(g), (k, v) => (typeof v === 'number' ? Math.round(v * 1e7) / 1e7 : v));
  const data = {
    generated: new Date().toISOString(),
    places: places().map(p => ({ key: p.key, layer: p.layerTitle, c: p.centroid && round(p.centroid), g: round(p.geometry) })),
    items: assets.filter(a => a.building),
  };
  const dir = path.join(WEBMAP, 'inventory');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'inventory_data.js'),
    '// Generated from the PPE Excel sheet - do not edit by hand.\nwindow.INVENTORY_DATA = ' + JSON.stringify(data) + ';\n');
  return data;
}

module.exports = {
  loadConfig, excelPath, placeList, readAssets, addAsset, updateAsset, deleteAsset, importAssets, publish,
  HEADERS, CATEGORIES, CONDITIONS,
};
