#!/usr/bin/env node
/**
 * Uploads the map + admin to Google Apps Script and publishes it as a web app.
 *
 *   npm run gas:deploy
 *
 * One-time setup (see README "Google Apps Script version"):
 *   1. Turn on "Google Apps Script API": https://script.google.com/home/usersettings
 *   2. npx clasp login            (opens a browser; sign in with the Google account
 *                                  that should own the Sheet)
 *
 * What it does each time:
 *   - first run only: creates the Apps Script project (apps-script/.clasp.json)
 *   - builds apps-script/dist (scripts/build_gas.js)
 *   - clasp push      uploads the files
 *   - first run: creates the web-app deployment; later runs update the same
 *     deployment, so the web address never changes (apps-script/deployment.json)
 */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { ROOT } = require('./lib');
const { build } = require('./build_gas');

const GAS_DIR = path.join(ROOT, 'apps-script');
const CLASP_JSON = path.join(GAS_DIR, '.clasp.json');
const DEPLOY_JSON = path.join(GAS_DIR, 'deployment.json');
const TITLE = 'Sherubtse PPE Map';

function clasp(args, { capture = false } = {}) {
  const cli = path.join(ROOT, 'node_modules', '@google', 'clasp', 'build', 'src', 'index.js');
  const cmd = fs.existsSync(cli) ? [process.execPath, [cli, ...args]] : [process.platform === 'win32' ? 'npx.cmd' : 'npx', ['clasp', ...args]];
  const r = spawnSync(cmd[0], cmd[1], { cwd: GAS_DIR, encoding: 'utf8', stdio: capture ? 'pipe' : 'inherit', shell: !fs.existsSync(cli) && process.platform === 'win32' });
  if (r.status !== 0) {
    const out = ((r.stdout || '') + (r.stderr || '')).trim();
    const err = new Error(`clasp ${args[0]} failed${out ? ':\n' + out : ''}`);
    err.output = out;
    throw err;
  }
  return (r.stdout || '').trim();
}

function step(msg) { console.log('\n== ' + msg); }

try {
  step('Checking Google login');
  let who = {};
  try { who = JSON.parse(clasp(['--json', 'show-authorized-user'], { capture: true })); } catch (e) { /* treat as logged out */ }
  if (!who.loggedIn) {
    console.log('Not logged in to Google yet. Double-click "Google Login.bat" (or run: npx.cmd clasp login),\n' +
      'sign in in the browser, then run this again.\n');
    process.exit(1);
  }
  console.log('Logged in' + (who.email ? ' as ' + who.email : '') + '.');

  if (!fs.existsSync(CLASP_JSON)) {
    step('Creating the Apps Script project (first run)');
    fs.mkdirSync(path.join(GAS_DIR, 'dist'), { recursive: true });
    clasp(['create-script', '--type', 'webapp', '--title', TITLE, '--rootDir', 'dist']);
    if (!fs.existsSync(CLASP_JSON)) throw new Error('clasp did not create apps-script/.clasp.json');
  }

  step('Building apps-script/dist');
  const files = build(); // also wipes anything clasp put in dist/
  console.log(`${Object.keys(files).length} files`);

  step('Uploading files (clasp push)');
  clasp(['push', '--force']);

  step('Publishing the web app');
  const desc = 'PPE map ' + new Date().toISOString().slice(0, 16).replace('T', ' ');
  let deploymentId = fs.existsSync(DEPLOY_JSON) ? JSON.parse(fs.readFileSync(DEPLOY_JSON, 'utf8')).deploymentId : null;
  if (deploymentId) {
    clasp(['update-deployment', deploymentId, '--description', desc]);
  } else {
    const out = clasp(['create-deployment', '--description', desc], { capture: true });
    console.log(out);
    const m = /(AKfy[\w-]{20,})/.exec(out);
    if (!m) throw new Error('Could not find the new deployment ID in clasp output. Run "npx clasp list-deployments" and save it to apps-script/deployment.json as {"deploymentId": "..."}');
    deploymentId = m[1];
    fs.writeFileSync(DEPLOY_JSON, JSON.stringify({ deploymentId }, null, 2) + '\n');
  }

  const url = `https://script.google.com/macros/s/${deploymentId}/exec`;
  const scriptId = JSON.parse(fs.readFileSync(CLASP_JSON, 'utf8')).scriptId;
  console.log('\nDone.');
  console.log(`  Map:    ${url}`);
  console.log(`  Admin:  ${url}?page=admin`);
  console.log(`  Editor: https://script.google.com/d/${scriptId}/edit`);
  if (!fs.existsSync(path.join(GAS_DIR, '.setup-done'))) {
    console.log('\nFIRST TIME ONLY: open the Editor link, choose the function "setup" and click Run.');
    console.log('Allow the permissions it asks for. The log then shows the new Google Sheet link and the admin password.');
    console.log('(When that is done, create an empty file apps-script/.setup-done to hide this reminder.)');
  }
} catch (e) {
  console.error('\n' + e.message);
  if (/User has not enabled the Apps Script API/i.test(e.message)) {
    console.error('\nTurn on the Apps Script API at https://script.google.com/home/usersettings, wait a minute, then try again.');
  }
  if (/access|domain|ANYONE_ANONYMOUS/i.test(e.message)) {
    console.error('\nIf your Google Workspace does not allow public web apps, rebuild for your domain only:\n  set GAS_ACCESS=DOMAIN  (PowerShell: $env:GAS_ACCESS="DOMAIN") and run npm run gas:deploy again.');
  }
  process.exit(1);
}
