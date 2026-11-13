/**
 * Sherubtse College PPE map: Google Apps Script web app.
 *
 *   <web app URL>               public map; click a building to see its assets
 *   <web app URL>?page=admin    admin: add / edit / delete, bulk Excel upload
 *
 * Data lives in a Google Sheet in the owner's Google Drive (same 11 columns
 * as "PPE update 2026-2027.xlsx"). Run setup() once from the editor.
 *
 * Script properties (Project Settings > Script properties):
 *   SHEET_ID        the register spreadsheet (setup() creates it)
 *   ADMIN_PASSWORD  admin page password (setup() generates one; see the log)
 *
 * PLACES (building names + layer) comes from Places.gs, generated from the map
 * by scripts/build_gas.js so the dropdown always matches the map.
 */

var HEADERS = ['Sl. No.', 'Asset Code / Tag No.', 'Asset Description',
  'Category (Land, Building, Furniture, Equipment, Vehicle, etc.)', 'Location', 'Custodian/Room',
  'Date of Purchase', 'Cost (Nu.)', 'Qty Found Physically', 'Condition (Good / Repairable / Unserviceable)', 'Remarks'];
var FIELDS = ['sl', 'code', 'description', 'category', 'location', 'room', 'date', 'cost', 'qty', 'condition', 'remarks'];
var CATEGORIES = ['Furniture', 'Equipment', 'Building', 'Land', 'Vehicle', 'Other'];
var CONDITIONS = ['Good', 'Repairable', 'Unserviceable'];
var SHEET_NAME = 'PPE update 2026-2027';

// ================================================================ web pages
function doGet(e) {
  var page = (e && e.parameter && e.parameter.page) === 'admin' ? 'Admin' : 'Map';
  var t = HtmlService.createTemplateFromFile(page);
  t.baseUrl = ScriptApp.getService().getUrl();
  t.building = (e && e.parameter && e.parameter.building) || '';
  return t.evaluate()
    .setTitle(page === 'Admin' ? 'PPE Register Admin' : 'Sherubtse College Webmap')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Used in HTML templates: <?!= include('File') ?> */
function include(name) {
  return HtmlService.createHtmlOutputFromFile(name).getContent();
}

// ==================================================================== setup
/**
 * Run once from the Apps Script editor (select "setup" and click Run).
 * Creates the register Google Sheet in your Drive (if SHEET_ID isn't set)
 * and an admin password (if ADMIN_PASSWORD isn't set). See the execution log.
 */
function setup() {
  var props = PropertiesService.getScriptProperties();
  var ss;
  if (props.getProperty('SHEET_ID')) {
    ss = SpreadsheetApp.openById(props.getProperty('SHEET_ID'));
    Logger.log('Using existing register: ' + ss.getUrl());
  } else {
    ss = SpreadsheetApp.create(SHEET_NAME);
    props.setProperty('SHEET_ID', ss.getId());
    Logger.log('Created register Google Sheet: ' + ss.getUrl());
  }
  formatSheet_(ss.getSheets()[0]);

  if (!props.getProperty('ADMIN_PASSWORD')) {
    var chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789', pw = '';
    for (var i = 0; i < 14; i++) pw += chars.charAt(Math.floor(Math.random() * chars.length));
    props.setProperty('ADMIN_PASSWORD', pw);
    Logger.log('Admin password created: ' + pw + '   (change it in Project Settings > Script properties)');
  } else {
    Logger.log('Admin password already set (Project Settings > Script properties > ADMIN_PASSWORD).');
  }
  Logger.log('Web app URL (after deploying): ' + (ScriptApp.getService().getUrl() || 'not deployed yet'));
}

/**
 * Run from the editor to see which Google Sheet the web app is linked to
 * and whether everything is set up. Changes nothing.
 */
function checkSetup() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SHEET_ID');
  Logger.log('--- PPE map setup check ---');
  if (!id) {
    Logger.log('NOT LINKED: no SHEET_ID yet. Run setup() to create and link the Google Sheet.');
  } else {
    try {
      var ss = SpreadsheetApp.openById(id);
      var sh = ss.getSheets()[0];
      var header = sh.getRange(1, 1, 1, HEADERS.length).getValues()[0];
      var headerOk = header.every(function (h, i) { return String(h).trim() === HEADERS[i]; });
      Logger.log('LINKED Google Sheet: "' + ss.getName() + '"');
      Logger.log('  Link: ' + ss.getUrl());
      Logger.log('  First tab: "' + sh.getName() + '", data rows: ' + Math.max(sh.getLastRow() - 1, 0));
      Logger.log('  Header row: ' + (headerOk ? 'OK' : 'DIFFERENT from expected - run setup() again to fix'));
      var assets = getAssets();
      var off = assets.filter(function (a) { return !a.building; });
      Logger.log('  Rows shown on the map: ' + (assets.length - off.length) +
        (off.length ? '; NOT on map (Location not a map building): ' + off.map(function (a) { return 'Sl ' + a.sl + ' "' + a.location + '"'; }).join(', ') : ''));
    } catch (e) {
      Logger.log('PROBLEM: SHEET_ID is set (' + id + ') but that Sheet cannot be opened: ' + e.message);
      Logger.log('  Fix: delete SHEET_ID in Project Settings > Script properties and run setup() again.');
    }
  }
  Logger.log('Admin password: ' + (props.getProperty('ADMIN_PASSWORD') ? 'set' : 'NOT SET - run setup()'));
  Logger.log('Web app URL: ' + (ScriptApp.getService().getUrl() || 'not deployed'));
}

/** Header row, column widths and dropdowns (Location = map building names). */
function formatSheet_(sh) {
  sh.setName(SHEET_NAME);
  if (sh.getMaxColumns() < HEADERS.length) sh.insertColumnsAfter(sh.getMaxColumns(), HEADERS.length - sh.getMaxColumns());
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight('bold').setWrap(true).setVerticalAlignment('middle').setBackground('#d9e2f3');
  sh.setFrozenRows(1);
  sh.setRowHeight(1, 54);
  [60, 200, 240, 240, 220, 200, 120, 110, 100, 130, 260].forEach(function (w, i) { sh.setColumnWidth(i + 1, w); });
  var rows = Math.max(sh.getMaxRows() - 1, 1000);
  if (sh.getMaxRows() < rows + 1) sh.insertRowsAfter(sh.getMaxRows(), rows + 1 - sh.getMaxRows());
  var names = PLACES.map(function (p) { return p.key; });
  // A list-based dropdown is limited to 500 items; there are ~130 places.
  sh.getRange(2, 5, rows, 1).setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(names, true).setAllowInvalid(false)
    .setHelpText('Choose a building name exactly as on the map.').build());
  sh.getRange(2, 4, rows, 1).setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(CATEGORIES, true).setAllowInvalid(true).build());
  sh.getRange(2, 10, rows, 1).setDataValidation(SpreadsheetApp.newDataValidation()
    .requireValueInList(CONDITIONS, true).setAllowInvalid(true).build());
  sh.getRange(2, 7, rows, 1).setNumberFormat('dd/mm/yyyy');
  sh.getRange(2, 8, rows, 1).setNumberFormat('#,##0.00');
}

// ============================================================ public reads
function getMeta() {
  return {
    places: PLACES.map(function (p) { return { key: p.key, layer: p.layer }; }),
    categories: CATEGORIES, conditions: CONDITIONS, excelFile: SHEET_NAME + ' (Google Sheet)',
  };
}

/** All register rows. Rows whose Location matches a map building get `building`. */
function getAssets() {
  var sh = sheet_();
  var last = sh.getLastRow();
  if (last < 2) return [];
  var values = sh.getRange(2, 1, last - 1, HEADERS.length).getValues();
  var tz = Session.getScriptTimeZone();
  var out = [];
  values.forEach(function (r, i) {
    if (r.slice(1).every(function (v) { return v === '' || v === null; })) return;
    var a = { row: i + 2 };
    FIELDS.forEach(function (f, c) { a[f] = r[c]; });
    a.sl = a.sl === '' ? null : Number(a.sl);
    a.date = a.date instanceof Date ? Utilities.formatDate(a.date, tz, 'yyyy-MM-dd') : String(a.date || '').trim();
    a.cost = a.cost === '' || a.cost === null ? null : Number(a.cost);
    a.qty = Number(a.qty) || 0;
    ['code', 'description', 'category', 'location', 'room', 'condition', 'remarks'].forEach(function (f) { a[f] = String(a[f] == null ? '' : a[f]).trim(); });
    var p = matchPlace_(a.location);
    a.building = p ? p.key : null;
    out.push(a);
  });
  return out;
}

// ================================================================== admin
/** Check the password; returns the register's link for the admin page. */
function login(password) {
  checkPassword_(password);
  return { ok: true, sheetUrl: spreadsheet_().getUrl() };
}

function addAsset(password, data) {
  checkPassword_(password);
  return withLock_(function () {
    var a = clean_(data), sh = sheet_();
    var info = lastRowAndSl_(sh);
    writeRow_(sh, info.last + 1, info.maxSl + 1, a);
    a.sl = info.maxSl + 1;
    return a;
  });
}

function updateAsset(password, sl, data) {
  checkPassword_(password);
  return withLock_(function () {
    var a = clean_(data), sh = sheet_();
    writeRow_(sh, findRow_(sh, sl), Number(sl), a);
    a.sl = Number(sl);
    return a;
  });
}

function deleteAsset(password, sl) {
  checkPassword_(password);
  return withLock_(function () {
    var sh = sheet_();
    sh.deleteRow(findRow_(sh, sl));
    return { ok: true };
  });
}

/**
 * Bulk import from an uploaded .xlsx (base64). The file is converted to a
 * temporary Google Sheet, read, and trashed. Rows with problems are skipped
 * and reported. mode: 'append' | 'replace'.
 */
function importExcel(password, base64, fileName, mode, dryRun) {
  checkPassword_(password);
  var rows = readUpload_(base64, fileName);
  var found = findHeader_(rows);
  if (!found) throw new Error('No header row with "Asset Description" and "Location" columns was found. Use the PPE sheet format.');
  var cols = found.cols, tz = Session.getScriptTimeZone();
  var valid = [], problems = [];
  for (var r = found.row + 1; r < rows.length; r++) {
    var raw = {};
    Object.keys(cols).forEach(function (f) { raw[f] = rows[r][cols[f]]; });
    var empty = Object.keys(raw).every(function (f) { return f === 'sl' || raw[f] === '' || raw[f] === null || raw[f] === undefined; });
    if (empty) continue;
    if (raw.date instanceof Date) raw.date = Utilities.formatDate(raw.date, tz, 'yyyy-MM-dd');
    else if (raw.date) {
      var m = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/.exec(String(raw.date).trim());
      raw.date = m ? m[3] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2) : String(raw.date).trim();
    }
    if (raw.qty === '' || raw.qty == null) raw.qty = 1;
    if (!raw.category) raw.category = 'Other';
    try { valid.push(clean_(raw)); }
    catch (e) {
      problems.push({ excelRow: r + 1, location: String(raw.location || ''), description: String(raw.description || ''), error: e.message });
    }
  }
  var summary = {
    sheet: found.sheet, rowsFound: valid.length + problems.length, valid: valid.length, problems: problems,
    buildings: unique_(valid.map(function (a) { return a.location; })).length, mode: mode, imported: 0,
  };
  if (dryRun || !valid.length) return summary;

  return withLock_(function () {
    var sh = sheet_();
    var info = lastRowAndSl_(sh);
    if (mode === 'replace' && info.last > 1) {
      sh.getRange(2, 1, info.last - 1, HEADERS.length).clearContent();
      info = { last: 1, maxSl: 0 };
    }
    var block = valid.map(function (a, i) { return rowValues_(info.maxSl + 1 + i, a); });
    sh.getRange(info.last + 1, 1, block.length, HEADERS.length).setValues(block);
    summary.imported = valid.length;
    return summary;
  });
}

/** The register as an .xlsx file (base64), for the "Download Excel" button. */
function exportXlsx(password) {
  checkPassword_(password);
  var ss = spreadsheet_();
  var url = 'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/export?format=xlsx';
  var blob = UrlFetchApp.fetch(url, { headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() } }).getBlob();
  return { name: SHEET_NAME + '.xlsx', base64: Utilities.base64Encode(blob.getBytes()) };
}

// ================================================================ helpers
function spreadsheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('SHEET_ID');
  if (!id) throw new Error('The register is not set up yet. The owner must run setup() in the Apps Script editor.');
  return SpreadsheetApp.openById(id);
}
function sheet_() { return spreadsheet_().getSheets()[0]; }

/** Password check with a global slow-down + lockout (Apps Script can't see visitor IPs). */
function checkPassword_(password) {
  var cache = CacheService.getScriptCache();
  var fails = Number(cache.get('pw_fails') || 0);
  if (fails >= 30) throw new Error('Too many wrong passwords. Admin login is locked for 15 minutes.');
  var real = PropertiesService.getScriptProperties().getProperty('ADMIN_PASSWORD');
  if (!real) throw new Error('No admin password is set. The owner must run setup() in the Apps Script editor.');
  if (String(password || '') !== real) {
    cache.put('pw_fails', String(fails + 1), 900);
    Utilities.sleep(1500);
    throw new Error('Wrong admin password.');
  }
}

function withLock_(fn) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try { return fn(); } finally { lock.releaseLock(); }
}

/** "degree hall-2" -> "Degree Hall 2": ignore case, spaces and punctuation. */
function norm_(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9#]+/g, ''); }
function matchPlace_(name) {
  var n = norm_(name);
  if (!n) return null;
  for (var i = 0; i < PLACES.length; i++) if (norm_(PLACES[i].key) === n) return PLACES[i];
  return null;
}
function unique_(arr) { return arr.filter(function (v, i) { return arr.indexOf(v) === i; }); }

function clean_(input) {
  var s = function (v) { return String(v === undefined || v === null ? '' : v).trim(); };
  var out = {
    code: s(input.code), description: s(input.description), category: s(input.category),
    location: s(input.location), room: s(input.room), date: s(input.date),
    cost: s(input.cost), qty: s(input.qty), condition: s(input.condition), remarks: s(input.remarks),
  };
  var errors = [];
  var place = matchPlace_(out.location);
  if (!place) errors.push('Choose a building from the list.');
  else out.location = place.key;
  if (!out.description) errors.push('Asset Description is required.');
  if (!out.category) errors.push('Category is required.');
  if (out.qty === '') out.qty = '1';
  if (!/^\d+$/.test(out.qty)) errors.push('Qty must be a whole number.');
  if (out.cost !== '' && !(Number(out.cost.replace(/,/g, '')) >= 0)) errors.push('Cost must be a number.');
  if (out.date && !/^\d{4}-\d{2}-\d{2}$/.test(out.date)) errors.push('Date must be YYYY-MM-DD.');
  if (errors.length) throw new Error(errors.join(' '));
  out.qty = Number(out.qty);
  out.cost = out.cost === '' ? null : Number(out.cost.replace(/,/g, ''));
  return out;
}

function rowValues_(sl, a) {
  var d = '';
  if (a.date) { var p = a.date.split('-'); d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])); }
  return [sl, a.code, a.description, a.category, a.location, a.room, d, a.cost == null ? '' : a.cost, a.qty, a.condition, a.remarks];
}
function writeRow_(sh, row, sl, a) {
  sh.getRange(row, 1, 1, HEADERS.length).setValues([rowValues_(sl, a)]);
}

function lastRowAndSl_(sh) {
  var last = sh.getLastRow(), maxSl = 0;
  if (last >= 2) {
    var sls = sh.getRange(2, 1, last - 1, 1).getValues();
    sls.forEach(function (r) { var n = Number(r[0]); if (n > maxSl) maxSl = n; });
  }
  return { last: Math.max(last, 1), maxSl: maxSl };
}
function findRow_(sh, sl) {
  var last = sh.getLastRow();
  if (last >= 2) {
    var sls = sh.getRange(2, 1, last - 1, 1).getValues();
    for (var i = 0; i < sls.length; i++) if (Number(sls[i][0]) === Number(sl)) return i + 2;
  }
  throw new Error('No record with Sl. No. ' + sl + '.');
}

/** Upload (base64 .xlsx or .csv) -> 2D array of the sheet that has the PPE headers. */
function readUpload_(base64, fileName) {
  var bytes = Utilities.base64Decode(base64);
  if (/\.csv$/i.test(fileName || '')) {
    return Utilities.parseCsv(Utilities.newBlob(bytes).getDataAsString('UTF-8'));
  }
  var blob = Utilities.newBlob(bytes, MimeType.MICROSOFT_EXCEL, fileName || 'upload.xlsx');
  var tmp;
  try {
    tmp = Drive.Files.create({ name: 'PPE upload (temporary)', mimeType: MimeType.GOOGLE_SHEETS }, blob);
  } catch (e) {
    throw new Error('That file could not be read as an Excel (.xlsx) workbook.');
  }
  try {
    var sheets = SpreadsheetApp.openById(tmp.id).getSheets();
    for (var i = 0; i < sheets.length; i++) {
      var values = sheets[i].getDataRange().getValues();
      if (findHeader_(values)) { values.sheetName = sheets[i].getName(); return values; }
    }
    return [];
  } finally {
    DriveApp.getFileById(tmp.id).setTrashed(true);
  }
}

var HEADER_RULES = [
  ['sl', /^(sl|s\.?\s*no|serial)/i], ['code', /code|tag/i], ['description', /descr/i],
  ['category', /categ/i], ['location', /location|building|block/i], ['room', /custodian|room/i],
  ['date', /date/i], ['cost', /cost|amount|price|value/i], ['qty', /qty|quantity/i],
  ['condition', /condition|status/i], ['remarks', /remark|note/i],
];
/** Finds the header row (first 15 rows) that has Description and Location. */
function findHeader_(rows) {
  for (var r = 0; r < Math.min(15, rows.length); r++) {
    var cols = {};
    rows[r].forEach(function (cell, c) {
      var h = String(cell || '').trim();
      if (!h) return;
      for (var k = 0; k < HEADER_RULES.length; k++) {
        var f = HEADER_RULES[k][0];
        if (!(f in cols) && HEADER_RULES[k][1].test(h)) { cols[f] = c; break; }
      }
    });
    if ('description' in cols && 'location' in cols) return { row: r, cols: cols, sheet: rows.sheetName || 'Sheet1' };
  }
  return null;
}
