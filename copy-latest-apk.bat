@echo off
echo Copying latest built APK to main folder as GymPlan.apk...
if exist "android\app\build\outputs\apk\debug\GymPlan.apk" (
    copy /Y "android\app\build\outputs\apk\debug\GymPlan.apk" "GymPlan.apk"
    echo [SUCCESS] Latest APK copied to: E:\My GYM Plan\GymPlan.apk
) else if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
    copy /Y "android\app\build\outputs\apk\debug\app-debug.apk" "GymPlan.apk"
    echo [SUCCESS] Latest APK copied to: E:\My GYM Plan\GymPlan.apk
) else (
    echo [INFO] Please build APK in Android Studio first (Build -^> Build APKs).
)
pause
