package re.notifica.push.ui.capacitor

import android.net.Uri
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.models.NotificareNotification
import re.notifica.push.ui.NotificarePushUI
import re.notifica.push.ui.ktx.pushUI

@CapacitorPlugin(name = "NotificarePushUIPlugin")
public class NotificarePushUIPlugin : Plugin(), NotificarePushUI.NotificationLifecycleListener {
    override fun load() {
        logger.hasDebugLoggingEnabled = Notificare.options?.debugLoggingEnabled ?: false

        // Make sure the listener isn't added in duplicate.
        Notificare.pushUI().removeLifecycleListener(this)

        EventBroker.setup(this::notifyListeners)
        Notificare.pushUI().addLifecycleListener(this)
    }

    // region Notificare Push UI

    @PluginMethod
    public fun presentNotification(call: PluginCall) {
        val data = call.getObject("notification") ?: run {
            call.reject("Missing 'notification' parameter.")
            return
        }

        val notification: NotificareNotification

        try {
            notification = NotificareNotification.fromJson(data)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        val activity = activity ?: run {
            call.reject("Cannot present a notification without an activity.")
            return
        }

        Notificare.pushUI().presentNotification(activity, notification)
        call.resolve()
    }

    @PluginMethod
    public fun presentAction(call: PluginCall) {
        val notificationData = call.getObject("notification") ?: run {
            call.reject("Missing 'notification' parameter.")
            return
        }

        val actionData = call.getObject("action") ?: run {
            call.reject("Missing 'action' parameter.")
            return
        }


        val notification: NotificareNotification
        val action: NotificareNotification.Action

        try {
            notification = NotificareNotification.fromJson(notificationData)
            action = NotificareNotification.Action.fromJson(actionData)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        val activity = activity ?: run {
            call.reject("Cannot present a notification action without an activity.")
            return
        }

        Notificare.pushUI().presentAction(activity, notification, action)
        call.resolve()
    }

    // region NotificarePushUI.NotificationLifecycleListener

    override fun onNotificationWillPresent(notification: NotificareNotification) {
        try {
            EventBroker.dispatchEvent("notification_will_present", notification.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the notification_will_present event.", e)
        }
    }

    override fun onNotificationPresented(notification: NotificareNotification) {
        try {
            EventBroker.dispatchEvent("notification_presented", notification.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the notification_presented event.", e)
        }
    }

    override fun onNotificationFinishedPresenting(notification: NotificareNotification) {
        try {
            EventBroker.dispatchEvent("notification_finished_presenting", notification.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the notification_finished_presenting event.", e)
        }
    }

    override fun onNotificationFailedToPresent(notification: NotificareNotification) {
        try {
            EventBroker.dispatchEvent("notification_failed_to_present", notification.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the notification_failed_to_present event.", e)
        }
    }

    override fun onNotificationUrlClicked(notification: NotificareNotification, uri: Uri) {
        try {
            val data = JSObject()
            data.put("notification", notification.toJson())
            data.put("url", uri.toString())

            EventBroker.dispatchEvent("notification_url_clicked", data)
        } catch (e: Exception) {
            logger.error("Failed to emit the notification_url_clicked event.", e)
        }
    }

    override fun onActionWillExecute(notification: NotificareNotification, action: NotificareNotification.Action) {
        try {
            val data = JSObject()
            data.put("notification", notification.toJson())
            data.put("action", action.toJson())

            EventBroker.dispatchEvent("action_will_execute", data)
        } catch (e: Exception) {
            logger.error("Failed to emit the action_will_execute event.", e)
        }
    }

    override fun onActionExecuted(notification: NotificareNotification, action: NotificareNotification.Action) {
        try {
            val data = JSObject()
            data.put("notification", notification.toJson())
            data.put("action", action.toJson())

            EventBroker.dispatchEvent("action_executed", data)
        } catch (e: Exception) {
            logger.error("Failed to emit the action_executed event.", e)
        }
    }

    override fun onActionFailedToExecute(
        notification: NotificareNotification,
        action: NotificareNotification.Action,
        error: Exception?,
    ) {
        try {
            val data = JSObject()
            data.put("notification", notification.toJson())
            data.put("action", action.toJson())
            if (error != null) data.put("error", error.localizedMessage)

            EventBroker.dispatchEvent("action_failed_to_execute", data)
        } catch (e: Exception) {
            logger.error("Failed to emit the action_failed_to_execute event.", e)
        }
    }

    override fun onCustomActionReceived(
        notification: NotificareNotification,
        action: NotificareNotification.Action,
        uri: Uri
    ) {
        try {
            val data = JSObject()
            data.put("notification", notification.toJson())
            data.put("action", action.toJson())
            data.put("url", uri.toString())

            EventBroker.dispatchEvent("custom_action_received", data)
        } catch (e: Exception) {
            logger.error("Failed to emit the custom_action_received event.", e)
        }
    }

    // endregion
}
