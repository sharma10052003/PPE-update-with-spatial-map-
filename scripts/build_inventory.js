#!/usr/bin/env node
/**
 * Publishes the PPE Excel sheet onto the map without running the server:
 * reads the Excel file named in config.json and writes
 * webmap/inventory/inventory_data.js, so webmap/index.html shows the
 * latest data even when opened as a plain file.
 *
 *   node scripts/build_inventory.js      (or: npm run build)
 *
 * Not needed while the server (npm start) is running: it updates the map live.
 */
const ppe = require('./ppe');

(async () => {
  const assets = await ppe.readAssets();
  const data = await ppe.publish(assets);
  const bad = assets.filter(a => !a.building);
  const byB = new Set(data.items.map(a => a.building));
  console.log(`Read ${assets.length} rows from ${ppe.excelPath()}`);
  console.log(`Published ${data.items.length} rows across ${byB.size} buildings to webmap/inventory/inventory_data.js`);
  if (bad.length) {
    console.log(`\n${bad.length} row(s) skipped: their Location is not a building name on the map:`);
    bad.forEach(a => console.log(`  - Sl. No. ${a.sl}: "${a.location}"`));
    console.log('Building names must match the admin dropdown exactly (see data/campus_features.csv, column "Map Key").');
  }
})().catch(e => { console.error('Failed:', e.message); process.exit(1); });
