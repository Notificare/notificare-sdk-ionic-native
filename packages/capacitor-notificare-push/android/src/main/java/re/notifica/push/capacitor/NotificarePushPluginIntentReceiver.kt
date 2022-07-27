package re.notifica.push.capacitor

import android.content.Context
import com.getcapacitor.JSObject
import re.notifica.internal.NotificareLogger
import re.notifica.models.NotificareNotification
import re.notifica.push.NotificarePushIntentReceiver
import re.notifica.push.models.NotificareSystemNotification
import re.notifica.push.models.NotificareUnknownNotification

internal class NotificarePushPluginIntentReceiver : NotificarePushIntentReceiver() {

    override fun onNotificationReceived(context: Context, notification: NotificareNotification) {
        try {
            EventBroker.dispatchEvent("notification_received", notification.toJson())
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the notification_received event.", e)
        }
    }

    override fun onSystemNotificationReceived(context: Context, notification: NotificareSystemNotification) {
        try {
            EventBroker.dispatchEvent("system_notification_received", notification.toJson())
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the system_notification_received event.", e)
        }
    }

    override fun onUnknownNotificationReceived(context: Context, notification: NotificareUnknownNotification) {
        try {
            EventBroker.dispatchEvent("unknown_notification_received", notification.toJson())
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the unknown_notification_received event.", e)
        }
    }

    override fun onNotificationOpened(context: Context, notification: NotificareNotification) {
        try {
            EventBroker.dispatchEvent("notification_opened", notification.toJson())
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the notification_opened event.", e)
        }
    }

    override fun onActionOpened(
        context: Context,
        notification: NotificareNotification,
        action: NotificareNotification.Action
    ) {
        try {
            val data = JSObject()
            data.put("notification", notification.toJson())
            data.put("action", action.toJson())

            EventBroker.dispatchEvent("notification_action_opened", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the notification_action_opened event.", e)
        }
    }
}
