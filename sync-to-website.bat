@echo off
title CodeByTushu - Gym Plan & Website Sync Pipeline
echo ========================================================
echo  CodeByTushu: Sync Gym Plan APK, Assets and Website Repo
echo ========================================================
node "%~dp0sync-to-website.js"
echo.
echo Press any key to exit...
pause >nul
