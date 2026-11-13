#!/usr/bin/env node
/**
 * Exports every building/place on the map, with all its details, to:
 *   data/campus_features.csv      (open in Excel)
 *   data/campus_features.geojson  (open in QGIS / geojson.io)
 * and creates data/inventory.csv (the furniture & equipment sheet) if it
 * doesn't exist yet.
 *
 *   node scripts/export_details.js
 */
const fs = require('fs');
const path = require('path');
const { DATA, loadPlaces, toCsv } = require('./lib');

fs.mkdirSync(DATA, { recursive: true });
const places = loadPlaces();

// ---- campus_features.csv -------------------------------------------------
// QGIS shapefile export cut field names to 10 characters; restore readable ones.
const ALIAS = {
  'Descriptio': 'Description', 'Ground Flo': 'Ground Floor', 'Ground Foo': 'Ground Floor',
  'First Floo': 'First Floor', 'Second Flo': 'Second Floor', 'Third Floo': 'Third Floor',
  'No. of uni': 'No. of Units', 'No. of Uni': 'No. of Units', 'No. of roo': 'No. of Rooms',
  'Units Offi': 'Units / Offices', 'ESTD': 'Established',
};
const skip = new Set(['Picture', 'Latitude', 'Longitude', 'Name']);
const ORDER = ['Established', 'Category', 'Capacity', 'No. of Units', 'No. of Rooms', 'Length', 'Width',
  'Ground Floor', 'First Floor', 'Second Floor', 'Third Floor', 'Top Floor', 'Units / Offices', 'Purpose', 'Description'];
const clean = p => {
  const out = {};
  for (const [k, v] of Object.entries(p.props)) {
    if (skip.has(k) || v === null || v === '') continue;
    const name = ALIAS[k] || k;
    out[name] = typeof v === 'string' ? v.replace(/\t/g, ' ').trim() : v;
  }
  return out;
};
const cleaned = places.map(clean);
const propCols = ORDER.filter(k => cleaned.some(c => k in c));
cleaned.forEach(c => Object.keys(c).forEach(k => { if (!propCols.includes(k)) propCols.push(k); }));
const header = ['Map Key', 'Layer', 'Centroid Lat', 'Centroid Lon', ...propCols];
const rows = places.map((p, i) => [
  p.key, p.layerTitle,
  p.centroid ? p.centroid[1].toFixed(6) : '', p.centroid ? p.centroid[0].toFixed(6) : '',
  ...propCols.map(k => cleaned[i][k]),
]);
fs.writeFileSync(path.join(DATA, 'campus_features.csv'), toCsv([header, ...rows]));

// ---- campus_features.geojson --------------------------------------------
const gj = {
  type: 'FeatureCollection',
  features: places.map((p, i) => ({
    type: 'Feature',
    properties: { map_key: p.key, layer: p.layerTitle, name: p.props.Name || null, ...cleaned[i] },
    geometry: p.geometry,
  })),
};
fs.writeFileSync(path.join(DATA, 'campus_features.geojson'), JSON.stringify(gj));

console.log(`Exported ${places.length} buildings/places:`);
console.log('  data/campus_features.csv');
console.log('  data/campus_features.geojson');

// ---- inventory.csv template ---------------------------------------------
const invPath = path.join(DATA, 'inventory.csv');
if (fs.existsSync(invPath)) {
  console.log('data/inventory.csv already exists - left unchanged.');
} else {
  const lib = places.find(p => p.key === 'Library');
  const pt = lib ? [(lib.centroid[1] + 0.00004).toFixed(6), (lib.centroid[0] - 0.00006).toFixed(6)] : ['', ''];
  const S = 'SAMPLE ROW - replace with real data';
  fs.writeFileSync(invPath, toCsv([
    ['Asset ID', 'Building', 'Floor', 'Room', 'Item', 'Category', 'Quantity', 'Condition', 'Remarks', 'Latitude', 'Longitude'],
    ['SC-F-0001', 'Media Lab Building', 'Ground Floor', 'Studio 1', 'Office chair', 'Furniture', 12, 'Good', S, '', ''],
    ['SC-E-0001', 'Media Lab Building', 'Ground Floor', 'Studio 1', 'DSLR camera', 'Equipment', 4, 'Good', S, '', ''],
    ['SC-E-0002', 'Media Lab Building', 'Top Floor', 'Laboratory', 'Desktop computer', 'Equipment', 20, 'Fair', S, '', ''],
    ['SC-F-0002', 'New Academic Block', 'Ground Floor', 'Conference Hall', 'Conference table', 'Furniture', 2, 'Good', S, '', ''],
    ['SC-E-0003', 'New Academic Block', 'Ground Floor', 'Conference Hall', 'Projector', 'Equipment', 1, 'Needs repair', S, '', ''],
    ['SC-F-0003', 'Library', 'Ground Floor', 'Reading room', 'Bookshelf', 'Furniture', 40, 'Good', S, '', ''],
    ['SC-E-0004', 'Library', 'Outside', 'Entrance', 'CCTV camera', 'Equipment', 1, 'Good', S + ' (has its own map position)', pt[0], pt[1]],
    ['SC-F-0004', 'Degree Hall 1', 'All floors', 'Rooms', 'Bed', 'Furniture', 60, 'Good', S, '', ''],
  ]));
  console.log('Created data/inventory.csv (with sample rows to replace).');
}
