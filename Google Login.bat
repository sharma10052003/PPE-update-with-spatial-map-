@echo off
title Google login for Apps Script
cd /d "%~dp0"
if not exist "node_modules\@google\clasp" (
  echo Installing first-time requirements...
  call npm.cmd install --no-fund --no-audit
)
echo.
echo A browser window will open. Sign in with the Google account that should
echo own the PPE Google Sheet, then click Allow.
echo.
call npx.cmd clasp login
echo.
pause
