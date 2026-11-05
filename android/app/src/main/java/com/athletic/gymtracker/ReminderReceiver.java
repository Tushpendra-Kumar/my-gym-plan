package com.athletic.gymtracker;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Build;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class ReminderReceiver extends BroadcastReceiver {

    public static final String CHANNEL_ID = "tushu_athletic_reminders";
    public static final String CHANNEL_NAME = "Tushu Gym Plan Reminders";

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();

        // Handle Quick Action from notification button ("Mark Done")
        if ("com.athletic.gymtracker.ACTION_MARK_DONE".equals(action)) {
            String type = intent.getStringExtra("reminder_type");
            int notifId = intent.getIntExtra("notif_id", 101);

            // Record as done in SharedPreferences
            String todayStr = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(new Date());
            SharedPreferences prefs = context.getSharedPreferences("tushu_reminders", Context.MODE_PRIVATE);
            prefs.edit().putString("last_done_" + type, todayStr).apply();

            // Cancel the notification
            NotificationManagerCompat.from(context).cancel(notifId);
            return;
        }

        String type = intent.getStringExtra("reminder_type");
        String title = intent.getStringExtra("reminder_title");
        String message = intent.getStringExtra("reminder_message");
        int notifId = intent.getIntExtra("notif_id", 101);

        if (title == null || title.isEmpty()) title = "Tushu Gym Plan Reminder";
        if (message == null || message.isEmpty()) message = "Aapka daily target abhi pending hai. Tap to complete!";

        // Check if user already marked this reminder done today
        String todayStr = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(new Date());
        SharedPreferences prefs = context.getSharedPreferences("tushu_reminders", Context.MODE_PRIVATE);
        String lastDone = prefs.getString("last_done_" + type, "");
        if (todayStr.equals(lastDone)) {
            // Already completed today, do not nag!
            return;
        }

        createNotificationChannel(context);

        // Click to Open App Intent
        Intent openAppIntent = new Intent(context, MainActivity.class);
        openAppIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        openAppIntent.putExtra("target_reminder", type);
        PendingIntent openPendingIntent = PendingIntent.getActivity(
                context,
                notifId,
                openAppIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        // Quick Action "Mark Done" directly from Lock Screen / Notification
        Intent markDoneIntent = new Intent(context, ReminderReceiver.class);
        markDoneIntent.setAction("com.athletic.gymtracker.ACTION_MARK_DONE");
        markDoneIntent.putExtra("reminder_type", type);
        markDoneIntent.putExtra("notif_id", notifId);
        PendingIntent markDonePendingIntent = PendingIntent.getBroadcast(
                context,
                notifId + 1000,
                markDoneIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        int iconRes = context.getApplicationInfo().icon;
        if (iconRes == 0) iconRes = android.R.drawable.ic_popup_reminder;

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
                .setSmallIcon(iconRes)
                .setContentTitle(title)
                .setContentText(message)
                .setStyle(new NotificationCompat.BigTextStyle().bigText(message))
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setCategory(NotificationCompat.CATEGORY_REMINDER)
                .setAutoCancel(true)
                .setContentIntent(openPendingIntent)
                .addAction(android.R.drawable.checkbox_on_background, "Done \u2713", markDonePendingIntent)
                .addAction(android.R.drawable.ic_menu_view, "Open App", openPendingIntent);

        try {
            NotificationManagerCompat.from(context).notify(notifId, builder.build());
        } catch (SecurityException ignored) {
            // Permission not granted on Android 13+
        }
    }

    public static void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                    CHANNEL_ID,
                    CHANNEL_NAME,
                    NotificationManager.IMPORTANCE_HIGH
            );
            channel.setDescription("Daily reminders for Workout, Hydration, and Nutrition protocols");
            channel.enableVibration(true);
            NotificationManager manager = context.getSystemService(NotificationManager.class);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }
    }
}
