#!/usr/bin/env node
/**
 * Exports every building/place on the map, with all its details, to:
 *   data/campus_features.csv      (open in Excel)
 *   data/campus_features.geojson  (open in QGIS / geojson.io)
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
