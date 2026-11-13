@echo off
title Sherubtse PPE Map
cd /d "%~dp0"
if not exist "node_modules\exceljs" (
  echo Installing first-time requirements...
  call npm install --no-fund --no-audit
)
start "" http://localhost:8080/admin/
node scripts\server.js
pause
