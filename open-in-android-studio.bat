@echo off
echo ========================================================
echo   Tushu Gym Plan - Launching Android Studio
echo ========================================================
echo.
echo Syncing latest web assets...
node sync-assets.js
echo.
echo Opening project in Android Studio...
start "" "C:\Program Files\Android\Android Studio\bin\studio64.exe" "%~dp0android"
echo.
echo ========================================================
echo   Android Studio khul raha hai!
echo   Upar Menu me jaayein:
echo   Build -> Build Bundle(s) / APK(s) -> Build APK(s)
echo ========================================================
pause
