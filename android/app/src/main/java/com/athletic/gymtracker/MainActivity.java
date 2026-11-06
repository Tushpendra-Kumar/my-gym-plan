package com.athletic.gymtracker;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private static final int REQ_CODE_NOTIF = 1001;

    @SuppressLint("SetJavaScriptEnabled")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Create Channel for Android 8+
        ReminderReceiver.createNotificationChannel(this);

        // Request Android 13+ Notification Permission if needed
        checkNotificationPermission();

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
        settings.setCacheMode(WebSettings.LOAD_DEFAULT);

        // Prevent external browser from opening and ensure 100% offline security
        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if (url != null && url.startsWith("file:///android_asset/")) {
                    return false;
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

        // Load 100% Offline Local Assets
        webView.loadUrl("file:///android_asset/www/index.html");

        // Handle Back button
        getOnBackPressedDispatcher().addCallback(this, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack();
                } else {
                    setEnabled(false);
                    getOnBackPressedDispatcher().onBackPressed();
                }
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

        private int getReqCodeForType(String type) {
            if ("workout".equals(type)) return 201;
            if ("hydrate".equals(type)) return 202;
            if ("fuel".equals(type)) return 203;
            return 200;
        }
    }
}
