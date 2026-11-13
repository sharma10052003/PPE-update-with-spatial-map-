/**
 * Shared helpers: read the map's layers and give every building / place a
 * unique "Map Key". The Map Key is what you type in the "Building" column of
 * data/inventory.csv.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WEBMAP = path.join(ROOT, 'webmap');
const DATA = path.join(ROOT, 'data');

/** Read a qgis2web layer file ("var json_X = {...};") as GeoJSON. */
function readLayerJson(file) {
  const t = fs.readFileSync(file, 'utf8');
  return JSON.parse(t.slice(t.indexOf('=') + 1).trim().replace(/;\s*$/, ''));
}

/** Layer order + human titles from layers/layers.js. */
function readLayerList() {
  const src = fs.readFileSync(path.join(WEBMAP, 'layers', 'layers.js'), 'utf8');
  const titles = {};
  for (const m of src.matchAll(/var lyr_(\w+) = new ol\.layer\.Vector\(\{[\s\S]*?popuplayertitle: '([^']*)'/g)) {
    titles[m[1]] = m[2];
  }
  const list = (src.match(/var layersList = \[([^\]]*)\]/) || [, ''])[1]
    .split(',').map(s => s.trim().replace(/^lyr_/, '')).filter(id => titles[id]);
  return list.map(id => ({ id, title: titles[id] }));
}

/** Area-weighted centroid of the largest polygon (or first point). Returns [lon, lat]. */
function centroid(geom) {
  if (!geom) return null;
  const c = geom.coordinates;
  if (geom.type === 'Point') return c;
  if (geom.type === 'MultiPoint') return c[0];
  const polys = geom.type === 'Polygon' ? [c] : geom.type === 'MultiPolygon' ? c : null;
  if (!polys) return null;
  let best = null, bestA = -1, bestRing = null;
  for (const p of polys) {
    const ring = p[0];
    // Work relative to the first vertex: multiplying raw lon/lat (~91 x ~27)
    // loses the tiny differences that make up a building's area.
    const [ox, oy] = ring[0];
    let a = 0, cx = 0, cy = 0;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0] - ox, yi = ring[i][1] - oy, xj = ring[j][0] - ox, yj = ring[j][1] - oy;
      const f = xj * yi - xi * yj;
      a += f; cx += (xj + xi) * f; cy += (yj + yi) * f;
    }
    if (Math.abs(a) > bestA) {
      bestA = Math.abs(a); bestRing = ring;
      best = a ? [ox + cx / (3 * a), oy + cy / (3 * a)] : ring[0];
    }
  }
  // L/U-shaped buildings can have their centroid outside the walls: use a point inside instead.
  return bestRing && !inRing(best, bestRing) ? pointInside(bestRing, best[1]) : best;
}

function inRing(pt, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Middle of the widest inside stretch along the horizontal line at latitude y (falls back to mid-height). */
function pointInside(ring, y) {
  const ys = ring.map(p => p[1]);
  const tryAt = lat => {
    const xs = [];
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i], [xj, yj] = ring[j];
      if ((yi > lat) !== (yj > lat)) xs.push(xi + (lat - yi) * (xj - xi) / (yj - yi));
    }
    xs.sort((p, q) => p - q);
    let bestW = -1, mid = null;
    for (let k = 0; k + 1 < xs.length; k += 2) if (xs[k + 1] - xs[k] > bestW) { bestW = xs[k + 1] - xs[k]; mid = (xs[k] + xs[k + 1]) / 2; }
    return mid === null ? null : [mid, lat];
  };
  return tryAt(y) || tryAt((Math.min(...ys) + Math.max(...ys)) / 2) || ring[0];
}

/**
 * All mappable places (polygons and points; roads/boundary lines skipped),
 * each with a unique key: its Name, or the layer title when unnamed,
 * with " #1", " #2"... added when the same name appears more than once.
 */
function loadPlaces() {
  const places = [];
  for (const { id, title } of readLayerList()) {
    const file = path.join(WEBMAP, 'layers', id + '.js');
    if (!fs.existsSync(file)) continue;
    for (const f of readLayerJson(file).features) {
      if (!f.geometry || /LineString/.test(f.geometry.type)) continue;
      const props = f.properties || {};
      const name = (props.Name && String(props.Name).trim()) || title;
      places.push({ name, layerId: id, layerTitle: title, props, geometry: f.geometry, centroid: centroid(f.geometry) });
    }
  }
  const total = {}, seen = {};
  places.forEach(p => { total[p.name] = (total[p.name] || 0) + 1; });
  places.forEach(p => {
    seen[p.name] = (seen[p.name] || 0) + 1;
    p.key = total[p.name] > 1 ? `${p.name} #${seen[p.name]}` : p.name;
  });
  return places;
}

/** Minimal RFC-4180 CSV parser (handles quotes, commas and newlines in cells). */
function parseCsv(text) {
  text = text.replace(/^﻿/, '');
  const rows = []; let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += ch;
  }
  if (cell !== '' || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(c => c.trim() !== ''));
}

function toCsv(rows) {
  const esc = v => {
    if (v === null || v === undefined) return '';
    const s = String(v);
    return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  return '﻿' + rows.map(r => r.map(esc).join(',')).join('\r\n') + '\r\n';
}

module.exports = { ROOT, WEBMAP, DATA, loadPlaces, parseCsv, toCsv, centroid };
