package re.notifica.push.capacitor

import android.content.Context
import com.getcapacitor.JSArray
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
        val data = JSObject()

        data.put("messageId", notification.messageId)
        data.put("messageType", notification.messageType)
        data.put("senderId", notification.senderId)
        data.put("collapseKey", notification.collapseKey)
        data.put("from", notification.from)
        data.put("to", notification.to)
        data.put("sentTime", notification.sentTime)
        data.put("ttl", notification.ttl)
        data.put("priority", notification.priority)
        data.put("originalPriority", notification.originalPriority)
        data.put("notification", notification.notification?.let {
            JSObject().apply {
                put("title", it.title)
                put("titleLocalizationKey", it.titleLocalizationKey)
                put("titleLocalizationArgs", it.titleLocalizationArgs?.let { args -> JSArray(args) })
                put("body", it.body)
                put("bodyLocalizationKey", it.bodyLocalizationKey)
                put("bodyLocalizationArgs", it.bodyLocalizationArgs?.let { args -> JSArray(args) })
                put("icon", it.icon)
                put("imageUrl", it.imageUrl?.toString())
                put("sound", it.sound)
                put("tag", it.tag)
                put("color", it.color)
                put("clickAction", it.clickAction)
                put("channelId", it.channelId)
                put("link", it.link?.toString())
                put("ticker", it.ticker)
                put("sticky", it.sticky)
                put("localOnly", it.localOnly)
                put("defaultSound", it.defaultSound)
                put("defaultVibrateSettings", it.defaultVibrateSettings)
                put("defaultLightSettings", it.defaultLightSettings)
                it.notificationPriority?.let { priority -> put("notificationPriority", priority) }
                it.visibility?.let { visibility -> put("visibility", visibility) }
                it.notificationCount?.let { notificationCount -> put("notificationCount", notificationCount) }
                it.eventTime?.let { eventTime -> put("eventTime", eventTime) }
                put("lightSettings", it.lightSettings?.let { args -> JSArray(args) })
                put("vibrateSettings", it.vibrateSettings?.let { args -> JSArray(args) })
            }
        })
        data.put("data", JSObject().apply {
            notification.data.forEach {
                put(it.key, it.value)
            }
        })

        EventBroker.dispatchEvent("unknown_notification_received", data)
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
