package com.athletic.gymtracker;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.activity.OnBackPressedCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.widget.Toast;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private static final int REQ_CODE_NOTIF = 1001;
    private String pendingUpiTxnRef = "";
    private ActivityResultLauncher<Intent> upiPaymentLauncher;

    // Live OTA & GitHub Releases Configuration (Tushpendra-Kumar/my-gym-plan)
    private static final String OTA_RAW_BASE = "https://raw.githubusercontent.com/Tushpendra-Kumar/my-gym-plan/main/";
    private static final String OTA_MANIFEST_URL = OTA_RAW_BASE + "ota-manifest.json";
    private static final String OTA_RELEASES_URL = "https://github.com/Tushpendra-Kumar/my-gym-plan/releases/latest";
    private static final int BUNDLED_OTA_BUILD_NUMBER = 15;
    private static final String BUNDLED_OTA_VERSION = "0.05.8";
    private static final String OTA_PREFS = "tushu_ota_state";

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Enforce pure Black & White Recents/Task Switcher bar (zero purple tint)
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                setTaskDescription(new ActivityManager.TaskDescription(
                        getString(R.string.app_name),
                        R.mipmap.ic_launcher,
                        0xFF111111
                ));
            }
        } catch (Exception ignored) {}

        // Create Channel for Android 8+
        ReminderReceiver.createNotificationChannel(this);

        // Request Android 13+ Notification Permission if needed
        checkNotificationPermission();

        // Register UPI ActivityResultLauncher for Native UPI App Checkout
        upiPaymentLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                result -> {
                    String rawResponse = "";
                    if (result.getData() != null) {
                        if (result.getData().getStringExtra("response") != null) {
                            rawResponse = result.getData().getStringExtra("response");
                        } else if (result.getData().getData() != null && result.getData().getData().getQuery() != null) {
                            rawResponse = result.getData().getData().getQuery();
                        }
                    }
                    deliverUpiResultToWeb(result.getResultCode(), rawResponse);
                }
        );

        // Create WebView
        webView = new WebView(this);
        setContentView(webView);

        // Configure WebView for 100% Offline Local Operation
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setAllowContentAccess(true);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setAllowUniversalAccessFromFileURLs(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
        webView.clearCache(true);

        // Prevent external browser from opening and transparently serve Live OTA web updates
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                try {
                    if (request != null && request.getUrl() != null) {
                        String fullUrl = request.getUrl().toString();
                        String prefix = "file:///android_asset/www/";
                        if (fullUrl.startsWith(prefix) && isOtaBundleActive()) {
                            String relPath = fullUrl.substring(prefix.length());
                            int qIdx = relPath.indexOf('?');
                            if (qIdx >= 0) relPath = relPath.substring(0, qIdx);
                            int hIdx = relPath.indexOf('#');
                            if (hIdx >= 0) relPath = relPath.substring(0, hIdx);

                            // Reject path traversal
                            if (!relPath.isEmpty() && !relPath.contains("..")) {
                                File otaFile = new File(new File(getFilesDir(), "ota_www"), relPath);
                                if (otaFile.exists() && otaFile.isFile() && otaFile.length() > 0) {
                                    return new WebResourceResponse(
                                            guessMimeType(relPath),
                                            "UTF-8",
                                            new FileInputStream(otaFile)
                                    );
                                }
                            }
                        }
                    }
                } catch (Exception ignored) {}
                return super.shouldInterceptRequest(view, request);
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url != null && url.startsWith("file:///android_asset/")) {
                    return false;
                }
                if (url != null && url.startsWith("mailto:")) {
                    try {
                        startActivity(new Intent(Intent.ACTION_VIEW, Uri.parse(url)));
                    } catch (Exception ignored) {}
                    return true;
                }
                return true; // Strict offline boundary: block external web leaks
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                handleIncomingIntent(getIntent());
            }
        });
        webView.setWebChromeClient(new WebChromeClient());

        // Register Native JavaScript Bridge for Offline Reminders & Alarms
        webView.addJavascriptInterface(new WebAppInterface(this), "Android");

        // Load 100% Offline Local Assets (Prefer Live OTA bundle if active, fallback to bundled APK assets)
        File otaIndex = new File(new File(getFilesDir(), "ota_www"), "index.html");
        if (isOtaBundleActive() && otaIndex.exists()) {
            webView.loadUrl(Uri.fromFile(otaIndex).toString());
        } else {
            webView.loadUrl("file:///android_asset/www/index.html");
        }

        // Handle Back button - Multi-Tier Navigation (Modals -> Drawer -> Tabs -> Home -> Double-Back Exit)
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            private long lastBackPressTime = 0;

            @Override
            public void handleOnBackPressed() {
                if (webView == null) {
                    finish();
                    return;
                }

                // Call JavaScript handleBackPress to close open modals/drawers or navigate back to Home tab
                webView.evaluateJavascript(
                        "(function() { return (typeof window.handleBackPress === 'function') ? window.handleBackPress() : 'unhandled'; })();",
                        value -> {
                            String result = (value != null) ? value.replace("\"", "").trim() : "unhandled";

                            if ("handled".equalsIgnoreCase(result)) {
                                // Web view handled closing modal, drawer, or switching to Home tab
                                return;
                            }

                            // If we are already on Home tab with no modals open, require double-back to exit
                            long currentTime = System.currentTimeMillis();
                            if (currentTime - lastBackPressTime < 2000) {
                                finish();
                            } else {
                                lastBackPressTime = currentTime;
                                Toast.makeText(MainActivity.this, "Press back again to exit Gym Plan", Toast.LENGTH_SHORT).show();
                            }
                        }
                );
            }
        });
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleIncomingIntent(intent);
    }

    private void handleIncomingIntent(Intent intent) {
        if (intent == null || webView == null) return;
        String reminderType = intent.getStringExtra("target_reminder");
        if (reminderType != null && !reminderType.isEmpty()) {
            // Trigger JavaScript deep link
            String js = "if (window.handleNotificationDeepLink) { window.handleNotificationDeepLink('" + reminderType + "'); }";
            webView.post(() -> webView.evaluateJavascript(js, null));
        }
    }

    private void checkNotificationPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.POST_NOTIFICATIONS)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(
                        this,
                        new String[]{Manifest.permission.POST_NOTIFICATIONS},
                        REQ_CODE_NOTIF
                );
            }
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (webView != null) {
            webView.onResume();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (webView != null) {
            webView.onPause();
        }
    }

    // ----------------------------------------------------
    // JAVASCRIPT INTERFACE (Zero-Internet Android Bridge)
    // ----------------------------------------------------
    public class WebAppInterface {
        private final Context mContext;

        public WebAppInterface(Context context) {
            this.mContext = context;
        }

        @JavascriptInterface
        public boolean isNativeAndroid() {
            return true;
        }

        @JavascriptInterface
        public void scheduleReminder(String type, int hour, int minute, String title, String message) {
            AlarmManager alarmManager = (AlarmManager) mContext.getSystemService(Context.ALARM_SERVICE);
            if (alarmManager == null) return;

            int reqCode = getReqCodeForType(type);

            Intent intent = new Intent(mContext, ReminderReceiver.class);
            intent.putExtra("reminder_type", type);
            intent.putExtra("reminder_title", title);
            intent.putExtra("reminder_message", message);
            intent.putExtra("notif_id", reqCode);

            PendingIntent pendingIntent = PendingIntent.getBroadcast(
                    mContext,
                    reqCode,
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );

            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(System.currentTimeMillis());
            calendar.set(Calendar.HOUR_OF_DAY, hour);
            calendar.set(Calendar.MINUTE, minute);
            calendar.set(Calendar.SECOND, 0);

            // If time already passed today, schedule for tomorrow
            if (calendar.getTimeInMillis() <= System.currentTimeMillis()) {
                calendar.add(Calendar.DAY_OF_YEAR, 1);
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                alarmManager.setExactAndAllowWhileIdle(
                        AlarmManager.RTC_WAKEUP,
                        calendar.getTimeInMillis(),
                        pendingIntent
                );
            } else {
                alarmManager.setExact(
                        AlarmManager.RTC_WAKEUP,
                        calendar.getTimeInMillis(),
                        pendingIntent
                );
            }
        }

        @JavascriptInterface
        public void cancelReminder(String type) {
            AlarmManager alarmManager = (AlarmManager) mContext.getSystemService(Context.ALARM_SERVICE);
            if (alarmManager == null) return;

            int reqCode = getReqCodeForType(type);
            Intent intent = new Intent(mContext, ReminderReceiver.class);
            PendingIntent pendingIntent = PendingIntent.getBroadcast(
                    mContext,
                    reqCode,
                    intent,
                    PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
            );
            alarmManager.cancel(pendingIntent);
        }

        @JavascriptInterface
        public void markReminderDone(String type) {
            String todayStr = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(new Date());
            SharedPreferences prefs = mContext.getSharedPreferences("tushu_reminders", Context.MODE_PRIVATE);
            prefs.edit().putString("last_done_" + type, todayStr).apply();
        }

        @JavascriptInterface
        public boolean isReminderDoneToday(String type) {
            String todayStr = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(new Date());
            SharedPreferences prefs = mContext.getSharedPreferences("tushu_reminders", Context.MODE_PRIVATE);
            String lastDone = prefs.getString("last_done_" + type, "");
            return todayStr.equals(lastDone);
        }

        @JavascriptInterface
        public void vibratePhone(long milliseconds) {
            try {
                Vibrator v = (Vibrator) mContext.getSystemService(Context.VIBRATOR_SERVICE);
                if (v != null && v.hasVibrator()) {
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        v.vibrate(VibrationEffect.createOneShot(milliseconds, VibrationEffect.DEFAULT_AMPLITUDE));
                    } else {
                        v.vibrate(milliseconds);
                    }
                }
            } catch (Exception ignored) {}
        }

        @JavascriptInterface
        public void launchUpiPayment(String upiId, String payeeName, String amount, String txnRef, String note) {
            runOnUiThread(() -> {
                try {
                    pendingUpiTxnRef = txnRef != null ? txnRef : "";
                    String safeUpiId = (upiId != null && !upiId.trim().isEmpty()) ? upiId.trim() : "Q788722929@ybl";
                    String safePayee = (payeeName != null && !payeeName.trim().isEmpty()) ? payeeName.trim() : "CodeByTushu";
                    String safeNote = (note != null && !note.trim().isEmpty()) ? note.trim() : "Gym Plan Pro Lifetime";
                    String safeAmount = (amount != null && !amount.trim().isEmpty()) ? amount.trim() : "499.00";

                    String upiUriStr = "upi://pay"
                            + "?pa=" + Uri.encode(safeUpiId, "@")
                            + "&pn=" + Uri.encode(safePayee)
                            + "&tr=" + Uri.encode(pendingUpiTxnRef)
                            + "&tn=" + Uri.encode(safeNote)
                            + "&am=" + Uri.encode(safeAmount)
                            + "&cu=INR";
                    Uri uri = Uri.parse(upiUriStr);

                    Intent upiIntent = new Intent(Intent.ACTION_VIEW, uri);
                    if (!getPackageManager().queryIntentActivities(upiIntent, 0).isEmpty()
                            || upiIntent.resolveActivity(getPackageManager()) != null) {
                        Intent chooser = Intent.createChooser(upiIntent, "Pay ₹499 to CodeByTushu via UPI");
                        upiPaymentLauncher.launch(chooser);
                    } else {
                        JSONObject errPayload = new JSONObject();
                        errPayload.put("status", "NO_UPI_APP");
                        errPayload.put("txnRef", pendingUpiTxnRef);
                        errPayload.put("message", "No UPI app detected on this device. Please scan the QR code or pay using UPI ID " + safeUpiId + ".");
                        deliverUpiJson(errPayload.toString());
                    }
                } catch (Exception e) {
                    try {
                        JSONObject errPayload = new JSONObject();
                        errPayload.put("status", "ERROR");
                        errPayload.put("txnRef", pendingUpiTxnRef);
                        errPayload.put("message", "Unable to open UPI app directly. Please scan the QR code to complete payment.");
                        deliverUpiJson(errPayload.toString());
                    } catch (Exception ignored) {}
                }
            });
        }

        @JavascriptInterface
        public String getAppBuildInfo() {
            try {
                SharedPreferences prefs = mContext.getSharedPreferences(OTA_PREFS, Context.MODE_PRIVATE);
                boolean otaActive = isOtaBundleActive();
                int activeBuild = otaActive ? prefs.getInt("ota_build", BUNDLED_OTA_BUILD_NUMBER) : BUNDLED_OTA_BUILD_NUMBER;
                String activeVer = otaActive ? prefs.getString("ota_version", BUNDLED_OTA_VERSION) : BUNDLED_OTA_VERSION;

                JSONObject obj = new JSONObject();
                obj.put("versionName", getInstalledVersionName());
                obj.put("versionCode", getInstalledVersionCode());
                obj.put("otaVersion", activeVer);
                obj.put("otaBuildNumber", activeBuild);
                obj.put("hasOtaActive", otaActive);
                return obj.toString();
            } catch (Exception e) {
                return "{\"versionName\":\"" + BUNDLED_OTA_VERSION + "\",\"versionCode\":7,\"otaVersion\":\"" + BUNDLED_OTA_VERSION + "\",\"otaBuildNumber\":" + BUNDLED_OTA_BUILD_NUMBER + ",\"hasOtaActive\":false}";
            }
        }

        @JavascriptInterface
        public void checkForOtaUpdate() {
            new Thread(() -> {
                try {
                    if (!isNetworkAvailable()) {
                        JSONObject offline = new JSONObject();
                        offline.put("status", "offline");
                        offline.put("message", "Internet is OFF. Turn on mobile data or Wi-Fi to check for updates.");
                        notifyOtaCheckResult(offline.toString());
                        return;
                    }

                    String manifestRaw = httpGetString(OTA_MANIFEST_URL + "?t=" + System.currentTimeMillis());
                    if (manifestRaw == null || manifestRaw.trim().isEmpty()) {
                        JSONObject err = new JSONObject();
                        err.put("status", "error");
                        err.put("message", "Could not fetch update manifest from GitHub. Verify repo is public & pushed.");
                        notifyOtaCheckResult(err.toString());
                        return;
                    }

                    JSONObject remote = new JSONObject(manifestRaw);
                    String remoteVersion = remote.optString("version", BUNDLED_OTA_VERSION);
                    int remoteBuild = remote.optInt("buildNumber", BUNDLED_OTA_BUILD_NUMBER);
                    int remoteNativeCode = remote.optInt("nativeVersionCode", 7);
                    String releasedAt = remote.optString("releasedAt", "");
                    String notes = remote.optString("notes", "New update available.");
                    String releaseUrl = remote.optString("releaseUrl", OTA_RELEASES_URL);

                    SharedPreferences prefs = mContext.getSharedPreferences(OTA_PREFS, Context.MODE_PRIVATE);
                    int localBuild = isOtaBundleActive()
                            ? prefs.getInt("ota_build", BUNDLED_OTA_BUILD_NUMBER)
                            : BUNDLED_OTA_BUILD_NUMBER;
                    int localNativeCode = getInstalledVersionCode();

                    JSONObject res = new JSONObject();
                    res.put("remoteVersion", remoteVersion);
                    res.put("remoteBuildNumber", remoteBuild);
                    res.put("releasedAt", releasedAt);
                    res.put("notes", notes);
                    res.put("releaseUrl", releaseUrl);

                    if (remoteNativeCode > localNativeCode) {
                        res.put("status", "apk_required");
                    } else if (remoteBuild > localBuild) {
                        res.put("status", "ota_available");
                    } else {
                        res.put("status", "up_to_date");
                    }
                    notifyOtaCheckResult(res.toString());
                } catch (Exception e) {
                    try {
                        JSONObject err = new JSONObject();
                        err.put("status", "error");
                        err.put("message", "Update check failed. Please check internet connection and try again.");
                        notifyOtaCheckResult(err.toString());
                    } catch (Exception ignored) {}
                }
            }).start();
        }

        @JavascriptInterface
        public void downloadAndApplyOtaUpdate() {
            new Thread(() -> {
                File stagingDir = new File(getFilesDir(), "ota_staging");
                File targetDir = new File(getFilesDir(), "ota_www");
                File backupDir = new File(getFilesDir(), "ota_backup");
                try {
                    if (!isNetworkAvailable()) {
                        notifyOtaError("Internet is OFF. Please turn on internet to download update.");
                        return;
                    }

                    String manifestRaw = httpGetString(OTA_MANIFEST_URL + "?t=" + System.currentTimeMillis());
                    if (manifestRaw == null || manifestRaw.trim().isEmpty()) {
                        notifyOtaError("Could not reach GitHub update server.");
                        return;
                    }

                    JSONObject remote = new JSONObject(manifestRaw);
                    String remoteVersion = remote.optString("version", BUNDLED_OTA_VERSION);
                    int remoteBuild = remote.optInt("buildNumber", BUNDLED_OTA_BUILD_NUMBER);
                    int remoteNativeCode = remote.optInt("nativeVersionCode", getInstalledVersionCode());
                    JSONArray files = remote.optJSONArray("files");

                    if (files == null || files.length() == 0) {
                        notifyOtaError("Update manifest has no files listed.");
                        return;
                    }

                    // Clean staging folder before downloading
                    deleteRecursive(stagingDir);
                    if (!stagingDir.mkdirs()) {
                        notifyOtaError("Unable to prepare internal storage for update.");
                        return;
                    }

                    int total = files.length();
                    for (int i = 0; i < total; i++) {
                        String relPath = files.optString(i, "").trim();
                        if (relPath.isEmpty() || relPath.contains("..")) continue;

                        notifyOtaProgress(i + 1, total, relPath);
                        File destFile = new File(stagingDir, relPath);
                        File parent = destFile.getParentFile();
                        if (parent != null && !parent.exists()) parent.mkdirs();

                        String fileUrl = OTA_RAW_BASE + relPath + "?t=" + System.currentTimeMillis();
                        boolean ok = downloadUrlToFile(fileUrl, destFile);
                        if (!ok || !destFile.exists() || destFile.length() == 0) {
                            deleteRecursive(stagingDir);
                            notifyOtaError("Download interrupted on " + relPath + ". Existing app is completely safe.");
                            return;
                        }
                    }

                    // Verify index.html exists in staging
                    File stagedIndex = new File(stagingDir, "index.html");
                    if (!stagedIndex.exists() || stagedIndex.length() < 500) {
                        deleteRecursive(stagingDir);
                        notifyOtaError("Update verification failed. Keeping current working build.");
                        return;
                    }

                    // Atomic swap: target -> backup, staging -> target
                    deleteRecursive(backupDir);
                    if (targetDir.exists()) {
                        targetDir.renameTo(backupDir);
                    }
                    boolean swapped = stagingDir.renameTo(targetDir);
                    if (!swapped) {
                        if (backupDir.exists()) backupDir.renameTo(targetDir);
                        deleteRecursive(stagingDir);
                        notifyOtaError("Could not activate update bundle. Keeping current build.");
                        return;
                    }
                    deleteRecursive(backupDir);

                    // Save OTA metadata bound to current APK versionCode
                    SharedPreferences prefs = mContext.getSharedPreferences(OTA_PREFS, Context.MODE_PRIVATE);
                    prefs.edit()
                            .putString("ota_version", remoteVersion)
                            .putInt("ota_build", remoteBuild)
                            .putInt("ota_apk_code", getInstalledVersionCode())
                            .putInt("ota_native_code", remoteNativeCode)
                            .putBoolean("ota_active", true)
                            .apply();

                    notifyOtaApplied(remoteVersion);

                    // Smoothly reload WebView on UI thread so new files take effect immediately
                    runOnUiThread(() -> {
                        if (webView != null) {
                            webView.postDelayed(() -> {
                                webView.clearCache(true);
                                File activeIndex = new File(new File(getFilesDir(), "ota_www"), "index.html");
                                if (activeIndex.exists()) {
                                    webView.loadUrl(Uri.fromFile(activeIndex).toString());
                                } else {
                                    webView.loadUrl("file:///android_asset/www/index.html");
                                }
                            }, 1100);
                        }
                    });
                } catch (Exception e) {
                    deleteRecursive(stagingDir);
                    notifyOtaError("Update failed safely. Please try again with stable internet.");
                }
            }).start();
        }

        @JavascriptInterface
        public void openExternalUrl(String url) {
            runOnUiThread(() -> {
                try {
                    if (url != null && url.startsWith("https://github.com/Tushpendra-Kumar/")) {
                        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        startActivity(intent);
                    }
                } catch (Exception ignored) {}
            });
        }

        @JavascriptInterface
        public void resetOtaCache() {
            deleteRecursive(new File(getFilesDir(), "ota_www"));
            SharedPreferences prefs = mContext.getSharedPreferences(OTA_PREFS, Context.MODE_PRIVATE);
            prefs.edit().clear().apply();
            runOnUiThread(() -> {
                if (webView != null) {
                    webView.clearCache(true);
                    webView.loadUrl("file:///android_asset/www/index.html");
                }
            });
        }

        private int getReqCodeForType(String type) {
            if ("workout".equals(type)) return 201;
            if ("hydrate".equals(type)) return 202;
            if ("fuel".equals(type)) return 203;
            return 200;
        }
    }

    private void deliverUpiResultToWeb(int resultCode, String rawResponse) {
        try {
            JSONObject payload = new JSONObject();
            String status = "CANCELLED";
            String txnId = "";
            String approvalRef = "";
            String responseCode = "";
            String respTxnRef = pendingUpiTxnRef;

            if (rawResponse != null && !rawResponse.trim().isEmpty()) {
                String[] pairs = rawResponse.split("&");
                for (String pair : pairs) {
                    String[] kv = pair.split("=", 2);
                    if (kv.length == 2) {
                        String key = kv[0].trim().toLowerCase(Locale.ROOT);
                        String val = kv[1].trim();
                        if ("status".equals(key)) status = val.toUpperCase(Locale.ROOT);
                        else if ("txnid".equals(key)) txnId = val;
                        else if ("approvalrefno".equals(key)) approvalRef = val;
                        else if ("responsecode".equals(key)) responseCode = val;
                        else if ("txnref".equals(key) && !val.isEmpty()) respTxnRef = val;
                    }
                }
            } else if (resultCode == RESULT_CANCELED) {
                status = "CANCELLED";
            }

            payload.put("status", status);
            payload.put("txnId", txnId);
            payload.put("approvalRefNo", approvalRef);
            payload.put("responseCode", responseCode);
            payload.put("txnRef", respTxnRef);
            payload.put("expectedTxnRef", pendingUpiTxnRef);
            payload.put("resultCode", resultCode);

            deliverUpiJson(payload.toString());
        } catch (Exception e) {
            deliverUpiJson("{\"status\":\"ERROR\",\"message\":\"Failed to read payment response.\"}");
        }
    }

    private void deliverUpiJson(String jsonStr) {
        if (webView == null) return;
        String js = "if (window.onNativeUpiResult) { window.onNativeUpiResult(" + jsonStr + "); }";
        webView.post(() -> webView.evaluateJavascript(js, null));
    }

    // =========================================================================
    // LIVE OTA ENGINE HELPERS (Atomic Swap • Zero Data Loss • Safe Offline Mode)
    // =========================================================================
    private boolean isOtaBundleActive() {
        try {
            SharedPreferences prefs = getSharedPreferences(OTA_PREFS, Context.MODE_PRIVATE);
            if (!prefs.getBoolean("ota_active", false)) return false;
            int savedApkCode = prefs.getInt("ota_apk_code", -1);
            int currentApkCode = getInstalledVersionCode();
            // If user installed a newer APK manually, ignore older OTA cache automatically
            if (savedApkCode != currentApkCode) return false;
            int savedOtaBuild = prefs.getInt("ota_build", 0);
            if (savedOtaBuild <= BUNDLED_OTA_BUILD_NUMBER) return false;
            File otaIndex = new File(new File(getFilesDir(), "ota_www"), "index.html");
            return otaIndex.exists() && otaIndex.length() > 500;
        } catch (Exception e) {
            return false;
        }
    }

    private int getInstalledVersionCode() {
        try {
            PackageInfo pInfo = getPackageManager().getPackageInfo(getPackageName(), 0);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                return (int) pInfo.getLongVersionCode();
            } else {
                return pInfo.versionCode;
            }
        } catch (Exception e) {
            return 7;
        }
    }

    private String getInstalledVersionName() {
        try {
            PackageInfo pInfo = getPackageManager().getPackageInfo(getPackageName(), 0);
            return pInfo.versionName != null ? pInfo.versionName : BUNDLED_OTA_VERSION;
        } catch (Exception e) {
            return BUNDLED_OTA_VERSION;
        }
    }

    private boolean isNetworkAvailable() {
        try {
            ConnectivityManager cm = (ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
            if (cm == null) return false;
            NetworkInfo active = cm.getActiveNetworkInfo();
            return active != null && active.isConnected();
        } catch (Exception e) {
            return false;
        }
    }

    private String guessMimeType(String path) {
        String lower = path.toLowerCase(Locale.ROOT);
        if (lower.endsWith(".html") || lower.endsWith(".htm")) return "text/html";
        if (lower.endsWith(".css")) return "text/css";
        if (lower.endsWith(".js")) return "application/javascript";
        if (lower.endsWith(".json")) return "application/json";
        if (lower.endsWith(".svg")) return "image/svg+xml";
        if (lower.endsWith(".png")) return "image/png";
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
        return "application/octet-stream";
    }

    private String httpGetString(String urlStr) {
        HttpURLConnection conn = null;
        try {
            URL url = new URL(urlStr);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(12000);
            conn.setUseCaches(false);
            conn.setRequestProperty("Cache-Control", "no-cache");
            if (conn.getResponseCode() != 200) return null;
            BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append('\n');
            }
            reader.close();
            return sb.toString();
        } catch (Exception e) {
            return null;
        } finally {
            if (conn != null) conn.disconnect();
        }
    }

    private boolean downloadUrlToFile(String urlStr, File destFile) {
        HttpURLConnection conn = null;
        try {
            URL url = new URL(urlStr);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setConnectTimeout(10000);
            conn.setReadTimeout(15000);
            conn.setUseCaches(false);
            conn.setRequestProperty("Cache-Control", "no-cache");
            if (conn.getResponseCode() != 200) return false;
            try (InputStream in = conn.getInputStream();
                 FileOutputStream out = new FileOutputStream(destFile)) {
                byte[] buf = new byte[8192];
                int len;
                while ((len = in.read(buf)) != -1) {
                    out.write(buf, 0, len);
                }
                out.flush();
            }
            return true;
        } catch (Exception e) {
            return false;
        } finally {
            if (conn != null) conn.disconnect();
        }
    }

    private void deleteRecursive(File fileOrDir) {
        if (fileOrDir == null || !fileOrDir.exists()) return;
        if (fileOrDir.isDirectory()) {
            File[] children = fileOrDir.listFiles();
            if (children != null) {
                for (File child : children) {
                    deleteRecursive(child);
                }
            }
        }
        fileOrDir.delete();
    }

    private void notifyOtaCheckResult(String jsonStr) {
        if (webView == null) return;
        String js = "if (window.onOtaCheckResult) { window.onOtaCheckResult(" + jsonStr + "); }";
        webView.post(() -> webView.evaluateJavascript(js, null));
    }

    private void notifyOtaProgress(int current, int total, String fileName) {
        if (webView == null) return;
        String safeFile = JSONObject.quote(fileName != null ? fileName : "");
        String js = "if (window.onOtaProgress) { window.onOtaProgress(" + current + "," + total + "," + safeFile + "); }";
        webView.post(() -> webView.evaluateJavascript(js, null));
    }

    private void notifyOtaApplied(String newVersion) {
        if (webView == null) return;
        String safeVer = JSONObject.quote(newVersion != null ? newVersion : "");
        String js = "if (window.onOtaApplied) { window.onOtaApplied(" + safeVer + "); }";
        webView.post(() -> webView.evaluateJavascript(js, null));
    }

    private void notifyOtaError(String message) {
        if (webView == null) return;
        String safeMsg = JSONObject.quote(message != null ? message : "Update failed.");
        String js = "if (window.onOtaError) { window.onOtaError(" + safeMsg + "); }";
        webView.post(() -> webView.evaluateJavascript(js, null));
    }
}
