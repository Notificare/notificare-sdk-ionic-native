package re.notifica.iam.capacitor

import android.os.Handler
import android.os.Looper
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.iam.NotificareInAppMessaging
import re.notifica.iam.ktx.inAppMessaging
import re.notifica.iam.models.NotificareInAppMessage
import re.notifica.internal.NotificareLogger

@CapacitorPlugin(name = "NotificareInAppMessagingPlugin")
public class NotificareInAppMessagingPlugin : Plugin(), NotificareInAppMessaging.MessageLifecycleListener {

    override fun load() {
        EventBroker.setup(this::notifyListeners)

        Notificare.inAppMessaging().removeLifecycleListener(this)
        Notificare.inAppMessaging().addLifecycleListener(this)
    }

    // region Notificare In-App Messaging

    @PluginMethod
    public fun hasMessagesSuppressed(call: PluginCall) {
        try {
            call.resolve(
                JSObject().apply {
                    put("result", Notificare.inAppMessaging().hasMessagesSuppressed)
                }
            )
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
        }
    }

    @PluginMethod
    public fun setMessagesSuppressed(call: PluginCall) {
        try {
            val suppressed = call.getBoolean("suppressed") ?: run {
                call.reject("Missing 'product' parameter.")
                return
            }

            Notificare.inAppMessaging().hasMessagesSuppressed = suppressed
            call.resolve()
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
        }
    }

    // region NotificareInAppMessaging.MessageLifecycleListener

    override fun onMessagePresented(message: NotificareInAppMessage) {
        try {
            val data = JSObject().apply {
                put("message", message.toJson())
            }

            EventBroker.dispatchEvent("message_presented", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the message_presented event.", e)
        }
    }

    override fun onMessageFinishedPresenting(message: NotificareInAppMessage) {
        try {
            val data = JSObject().apply {
                put("message", message.toJson())
            }

            EventBroker.dispatchEvent("message_finished_presenting", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the message_finished_presenting event.", e)
        }
    }

    override fun onMessageFailedToPresent(message: NotificareInAppMessage) {
        try {
            val data = JSObject().apply {
                put("message", message.toJson())
            }

            EventBroker.dispatchEvent("message_failed_to_present", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the message_failed_to_present event.", e)
        }
    }

    override fun onActionExecuted(message: NotificareInAppMessage, action: NotificareInAppMessage.Action) {
        try {
            val data = JSObject().apply {
                put("message", message.toJson())
                put("action", action.toJson())
            }

            EventBroker.dispatchEvent("action_executed", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the action_executed event.", e)
        }
    }

    override fun onActionFailedToExecute(
        message: NotificareInAppMessage,
        action: NotificareInAppMessage.Action,
        error: Exception?
    ) {
        try {
            val data = JSObject().apply {
                put("message", message.toJson())
                put("action", action.toJson())
            }

            if (error != null) {
                data.put("error", error.message)
            }

            EventBroker.dispatchEvent("action_failed_to_execute", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the action_failed_to_execute event.", e)
        }
    }

    // endregion

    // endregion

    public companion object {
        internal fun onMainThread(action: () -> Unit) = Handler(Looper.getMainLooper()).post(action)
    }
}
