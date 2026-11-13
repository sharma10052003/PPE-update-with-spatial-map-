@echo off
title Upload PPE map to Google Apps Script
cd /d "%~dp0"
if not exist "node_modules\@google\clasp" (
  echo Installing first-time requirements...
  call npm.cmd install --no-fund --no-audit
)
call npm.cmd run gas:deploy
echo.
pause
