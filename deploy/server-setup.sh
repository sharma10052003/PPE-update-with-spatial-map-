#!/usr/bin/env bash
# Installs / updates the Sherubtse PPE map on a Linux (Ubuntu) web server.
# Run on the server by deploy.ps1, or by hand:
#   sudo bash server-setup.sh /tmp/sherubtse-ppe.tar.gz /opt/sherubtse-ppe
#
# - Keeps the server's existing Excel register (data/*.xlsx) on updates.
# - Runs the app as a systemd service on 127.0.0.1:8080 (Apache proxies to it).
# - Admin password lives in /etc/sherubtse-ppe.env (asked for on first install).
set -euo pipefail

ARCHIVE="${1:?usage: server-setup.sh <archive.tar.gz> [app dir]}"
APP_DIR="${2:-/opt/sherubtse-ppe}"
SERVICE=sherubtse-ppe
ENV_FILE=/etc/sherubtse-ppe.env
RUN_USER=sherubtse-ppe

if [[ $EUID -ne 0 ]]; then echo "Run with sudo." >&2; exit 1; fi

# --- Node.js 18+ --------------------------------------------------------------
if ! command -v node >/dev/null || [[ $(node -p 'process.versions.node.split(".")[0]') -lt 18 ]]; then
  echo "Node.js 18 or newer is required. Install it first, e.g.:"
  echo "  curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt-get install -y nodejs"
  exit 1
fi

# --- service user -------------------------------------------------------------
id "$RUN_USER" >/dev/null 2>&1 || useradd --system --home "$APP_DIR" --shell /usr/sbin/nologin "$RUN_USER"

# --- unpack, keeping the live Excel register -------------------------------------
mkdir -p "$APP_DIR/data"
STAGE=$(mktemp -d)
tar -xzf "$ARCHIVE" -C "$STAGE"
for f in "$STAGE"/data/*.xlsx; do
  [[ -e "$f" ]] || continue
  if [[ -e "$APP_DIR/data/$(basename "$f")" ]]; then
    echo "Keeping the server's existing $(basename "$f") (not overwritten)."
    rm -f "$f"
  fi
done
cp -a "$STAGE"/. "$APP_DIR"/
rm -rf "$STAGE"

cd "$APP_DIR"
npm ci --omit=dev --no-fund --no-audit
chown -R "$RUN_USER":"$RUN_USER" "$APP_DIR"

# --- admin password -------------------------------------------------------------
if [[ ! -f "$ENV_FILE" ]]; then
  echo
  read -r -s -p "Choose the admin password for the PPE admin page (10+ characters): " PW; echo
  if [[ ${#PW} -lt 10 ]]; then echo "Password too short." >&2; exit 1; fi
  umask 077
  cat > "$ENV_FILE" <<EOF
HOST=127.0.0.1
PORT=8080
ADMIN_PASSWORD=$PW
EOF
  echo "Saved to $ENV_FILE (edit it and run: sudo systemctl restart $SERVICE to change)."
fi

# --- systemd service ------------------------------------------------------------
cat > /etc/systemd/system/$SERVICE.service <<EOF
[Unit]
Description=Sherubtse College PPE map
After=network.target

[Service]
Type=simple
User=$RUN_USER
WorkingDirectory=$APP_DIR
EnvironmentFile=$ENV_FILE
ExecStart=$(command -v node) scripts/server.js
Restart=on-failure
NoNewPrivileges=true
ProtectSystem=full
ReadWritePaths=$APP_DIR

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable "$SERVICE" >/dev/null
systemctl restart "$SERVICE"
sleep 2
systemctl --no-pager --lines=8 status "$SERVICE" || true

echo
echo "App is running on http://127.0.0.1:8080 on this server."
echo "Next (first time only): publish it through Apache with HTTPS - see deploy/apache-ppe.conf."
