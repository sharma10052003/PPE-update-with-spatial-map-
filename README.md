# Sherubtse College Webmap: PPE Register

An offline copy of https://finalmap.sherubtse.edu.bt/ where every building shows
its furniture & equipment (PPE) from the Excel sheet **`data/PPE update 2026-2027.xlsx`**.

An admin enters assets on a web form → they are saved as rows in the Excel sheet →
clicking that building on the map shows them.

Requires [Node.js](https://nodejs.org).

## First-time setup (after downloading from GitHub)

```bash
npm install
```

On first start, `config.json` is created (see `config.example.json`) and an empty register is made from
`data/PPE-template.xlsx`. The live register and `config.json` are never committed to git (see `.gitignore`).

## Start

Double-click **`Start PPE Map.bat`**, or run:

```bash
npm start
```

- Admin (data entry): http://localhost:8080/admin/
- Map: http://localhost:8080/

Keep the black server window open while using it. Close it to stop.

## Entering data (admin)

1. Pick the **Location (building)** from the dropdown. Type in the box above it to filter.
   The names are taken from the map itself, so they always match it exactly.
2. Fill in the other columns (same as the Excel sheet): Asset Code / Tag No., Asset Description,
   Category, Custodian/Room, Date of Purchase, Cost (Nu.), Qty Found Physically, Condition, Remarks.
3. **Save to Excel**. Sl. No. is numbered automatically. The record appears on the map within ~15 s
   (or immediately after a refresh).

The records table under the form has Edit and Delete buttons, and every building name links to it on the map.
**Download Excel** saves the current sheet.

**Close the Excel file in Excel before saving from the admin page.** Windows locks open files; the admin
page tells you if that happens.

## Uploading a whole Excel sheet (bulk import)

On the admin page, under **Upload Excel sheet**:

1. Choose a filled-in `.xlsx` in the PPE sheet format. The header row can be anywhere in the first
   15 rows, and extra title rows are fine.
2. Choose **Add to existing records** or **Replace all records**.
3. Click **Check file**. You'll see how many rows are valid, plus a list of problem rows with their Excel row
   number (unknown building, missing description, quantity not a number...).
4. Click **Import**. Valid rows are saved into the register and appear on the map; problem rows are skipped.
   Fix them in your file and upload just those rows again.

Building names are matched ignoring capitals, spaces and punctuation, so `DEGREE HALL-2` →
`Degree Hall 2` and `Mother Peters Hall` → `Mother Peter's Hall`. Dates can be real Excel dates,
`2021-06-15` or `15/06/2021`.

## On the map

- Dark-blue circles show the number of items in a building. Click a circle or the building itself:
  the panel lists all its assets grouped by Custodian/Room, with code, category, date, cost and condition.
- Search, Category and Condition filters, plus **Download this view (CSV)** for reports.
- Link straight to a building: `http://localhost:8080/?building=Degree Hall 2`

## Editing the Excel sheet directly

You can also type rows straight into the Excel sheet. The **Location** column must be exactly
a building name from the admin dropdown (also listed in `data/campus_features.csv`, column "Map Key";
capitals don't matter). The server reads the sheet fresh every time, so changes show up automatically.
Rows whose Location isn't a map building are highlighted red on the admin page.

To view the map **without** the server (opening `webmap/index.html` directly), run
`npm run build` first to copy the latest Excel data into the map.

## Settings: `config.json`

| Setting | Meaning |
|---|---|
| `excelFile` | Which Excel file entries are saved to |
| `port` | Web address port (default 8080) |
| `host` | `127.0.0.1` = only this computer. `0.0.0.0` = other computers on the network can open it too |
| `adminPassword` | If set, the admin page asks for user `admin` + this password. Required for `0.0.0.0` or internet use. Without a password, the admin page only works on this computer |

Restart the server after changing settings. On a server, the environment variables `PPE_EXCEL_FILE`, `PORT`,
`HOST`, `ADMIN_PASSWORD` override `config.json`. The deploy script sets these for you.

## Putting it on the internet

The map (`/`) is public and read-only. The admin page (`/admin/`) always needs user **admin** + the
admin password once it is reachable from other computers. The server refuses to start otherwise.
After 10 wrong passwords, that address is locked out for 15 minutes.

**Note:** the public map shows every asset, including cost. Tell the developer if costs should be hidden from the public.

### Recommended: the college web server (where finalmap.sherubtse.edu.bt runs)

Ask IT for an SSH login with sudo on that server (or any Ubuntu server), then from this folder in PowerShell:

```powershell
.\deploy\deploy.ps1 -Server youruser@server-address
```

This packs the project, uploads it, installs it as a background service and asks (once) for the admin password.
Re-run it any time to update. **The server's Excel register is never overwritten.** After going live, the
copy on the server is the real register (download it with **Download Excel**).

First time only, publish it through Apache with HTTPS. The steps are inside `deploy/apache-ppe.conf`.
You'll need a DNS name such as `ppe.sherubtse.edu.bt` from IT. HTTPS is required, so the password isn't sent in plain text.

Server requirements: Ubuntu/Debian, Node.js 18+, Apache with `mod_proxy`.

### Quick option: other computers on the college network only

In `config.json` set `"host": "0.0.0.0"` and a long `"adminPassword"`, then start the server. It prints the
address to use (e.g. `http://10.2.3.4:8080/`). This PC must stay on, and Windows Firewall must allow port 8080
(Windows asks the first time; an administrator has to approve it). Traffic is not encrypted on this option,
so use it only inside the college network.

## Google Apps Script version (register in Google Sheets)

The same map and admin page can run as a **Google Apps Script web app**. The register is then a
**Google Sheet in your Google Drive** instead of an Excel file, and Google hosts the web pages,
so you don't need a server or a PC that stays on.

| | PC / server version | Google version |
|---|---|---|
| Register | `data/PPE update 2026-2027.xlsx` | Google Sheet "PPE update 2026-2027" in your Drive |
| Address | `http://<this PC>:8080/` | `https://script.google.com/macros/s/…/exec` |
| Admin | `/admin/`, browser login box | `…/exec?page=admin`, password screen |
| Admin password | `config.json` | Apps Script → Project Settings → Script properties → `ADMIN_PASSWORD` |

### One-time setup

1. Sign in to the Google account that should own the register, and turn on the
   **Google Apps Script API**: https://script.google.com/home/usersettings
2. In the `Spatial map` folder:
   ```bash
   npm install
   ```
   ```bash
   npx clasp login
   ```
   A browser opens. Sign in with that same Google account and click **Allow**.
3. Upload and publish:
   ```bash
   npm run gas:deploy
   ```
   It prints the **Map**, **Admin** and **Editor** links.
4. Open the **Editor** link, pick the function **`setup`** in the toolbar, click **Run** and allow the permissions.
   Google warns that the app isn't verified, because it's your own script: click *Advanced → Go to Sherubtse PPE Map*.
   The execution log shows:
   - the link to the new **Google Sheet** (same 11 columns; Location, Category and Condition are dropdowns,
     and the Location list has exactly the map's building names)
   - the generated **admin password** (change it under Project Settings → Script properties)

### Updating

After changing the map or code, run `npm run gas:deploy` again. It updates the same web app, so the link stays the same.

### Using it

- Map: share the **Map** link. Anyone can open it, no Google login needed.
- Admin: open the **Admin** link and enter the admin password. Add/edit/delete, **Upload Excel sheet** (bulk import
  of `.xlsx` or `.csv`), **Download Excel** (exports the Google Sheet as `.xlsx`) and **Open Google Sheet**.
- You can also type rows straight into the Google Sheet. The map picks them up within a minute.

### If your college Google account restricts it

Google Workspace admins (e.g. rub.edu.bt) can block public web apps or tools like clasp. If deploying fails
with an access/permission error:
- Limit the web app to your college accounts only: in PowerShell run `$env:GAS_ACCESS="DOMAIN"`, then `npm run gas:deploy`.
- Or use a personal Gmail account, or ask the IT admin to allow Apps Script.

## Building names

Buildings that share a name on the map are numbered: `Faculty Resident #1` … `#25`,
`Old Block #1` / `#2`, `Student Service Village #1` … `#4`. Click the building on the map
(with the Inventory panel open) to see which number it is.

## Folders

| Path | What it is |
|---|---|
| `Start PPE Map.bat` | Starts everything |
| `admin/` | Data-entry page |
| `webmap/` | The map (`webmap/inventory/` = the PPE layer) |
| `data/PPE update 2026-2027.xlsx` | **The PPE register** |
| `data/campus_features.csv` / `.geojson` | All buildings and their details from the map |
| `scripts/server.js` | Web server: map + admin + saving to Excel |
| `scripts/ppe.js` | Excel read/write logic |
| `scripts/build_inventory.js` | Copies Excel data into the map for offline viewing |
| `scripts/download_map.js` | Re-downloads the live map from finalmap.sherubtse.edu.bt |
| `scripts/export_details.js` | Re-exports building details to `data/` |
| `apps-script/src/Code.gs` | Google Apps Script server code (Google Sheet register) |
| `scripts/build_gas.js` | Builds the Apps Script files into `apps-script/dist/` |
| `scripts/gas_deploy.js` | `npm run gas:deploy`: builds, uploads with clasp, publishes the web app |
| `deploy/deploy.ps1` | Uploads + installs everything on a Linux web server |
| `deploy/server-setup.sh` | Runs on the server: installs the service (called by deploy.ps1) |
| `deploy/apache-ppe.conf` | Apache site + HTTPS instructions |
| `original/` | Untouched backup of the downloaded map |
