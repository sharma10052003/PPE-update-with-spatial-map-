<#
  Uploads the PPE map + admin to a Linux web server and installs/updates it.

  Usage (PowerShell, in the "Spatial map" folder):
    .\deploy\deploy.ps1 -Server youruser@your-server-address

  Optional:
    -AppDir /opt/sherubtse-ppe   where it is installed on the server

  Needs: SSH login to the server with sudo rights (ask the college IT team),
  and the Windows OpenSSH client (ssh/scp, built into Windows 10/11).

  Safe to re-run for updates: the server's Excel register is never overwritten.
  The first run asks you (on the server) to choose the admin password.
#>
param(
  [Parameter(Mandatory = $true)][string]$Server,
  [string]$AppDir = "/opt/sherubtse-ppe"
)
$ErrorActionPreference = "Stop"

if ($Server -match '^(yourlogin|youruser)@|@(your-server|server-address)$' -or $Server -notmatch '^[^@\s]+@[^@\s]+$') {
  Write-Host ""
  Write-Host "'$Server' is not a real server login." -ForegroundColor Red
  Write-Host "Replace it with the SSH login your college IT team gives you, for example:"
  Write-Host "  -Server sonam@103.133.218.93" -ForegroundColor Yellow
  Write-Host "You need: a Linux (Ubuntu) web server, a user name on it with sudo rights, and its address."
  Write-Host "Until then, use 'Start PPE Map.bat' to run the map on this PC for the college network."
  exit 1
}

$Root = Split-Path -Parent $PSScriptRoot
$Archive = Join-Path $env:TEMP "sherubtse-ppe.tar.gz"

foreach ($cmd in "ssh", "scp", "tar") {
  if (-not (Get-Command $cmd -ErrorAction SilentlyContinue)) { throw "'$cmd' was not found. Install the Windows OpenSSH Client (Settings > Apps > Optional features)." }
}

Write-Host "Packing $Root ..."
if (Test-Path $Archive) { Remove-Item $Archive -Force }
Push-Location $Root
try {
  tar -czf $Archive --exclude="*.tmp" admin scripts webmap data deploy package.json package-lock.json README.md
  if ($LASTEXITCODE -ne 0) { throw "tar failed" }
} finally { Pop-Location }
Write-Host ("Package: {0:N1} MB" -f ((Get-Item $Archive).Length / 1MB))

Write-Host "Uploading to $Server ..."
scp $Archive "$($Server):/tmp/sherubtse-ppe.tar.gz"
if ($LASTEXITCODE -ne 0) { throw "Upload failed" }
scp (Join-Path $PSScriptRoot "server-setup.sh") "$($Server):/tmp/sherubtse-ppe-setup.sh"
if ($LASTEXITCODE -ne 0) { throw "Upload failed" }

Write-Host "Installing on the server (you may be asked for your sudo password) ..."
ssh -t $Server "sudo bash /tmp/sherubtse-ppe-setup.sh /tmp/sherubtse-ppe.tar.gz $AppDir && rm -f /tmp/sherubtse-ppe.tar.gz /tmp/sherubtse-ppe-setup.sh"
if ($LASTEXITCODE -ne 0) { throw "Server setup failed (see messages above)." }

Remove-Item $Archive -Force
Write-Host ""
Write-Host "Done. First time only: set up the Apache site + HTTPS on the server, following deploy\apache-ppe.conf." -ForegroundColor Green
