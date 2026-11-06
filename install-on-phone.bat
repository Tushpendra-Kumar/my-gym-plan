@echo off
title Tushu Gym Plan - Mobile Install
echo ========================================================
echo   Tushu Gym Plan - Syncing Latest Assets...
echo ========================================================
node sync-assets.js
echo.
echo ========================================================
echo   Starting Mobile Install Server...
echo ========================================================
node server.js
pause
