package re.notifica.push.capacitor

import android.content.Intent
import android.os.Handler
import android.os.Looper
import androidx.lifecycle.Observer
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.push.ktx.push

@CapacitorPlugin(name = "NotificarePushPlugin")
public class NotificarePushPlugin : Plugin() {
    private val allowedUIObserver = Observer<Boolean> { allowedUI ->
        if (allowedUI == null) return@Observer

        EventBroker.dispatchEvent("notification_settings_changed", JSObject().apply {
            put("granted", allowedUI)
        })
    }

    override fun load() {
        EventBroker.setup(this::notifyListeners)
        Notificare.push().intentReceiver = NotificarePushPluginIntentReceiver::class.java

        onMainThread {
            Notificare.push().observableAllowedUI.removeObserver(allowedUIObserver)
            Notificare.push().observableAllowedUI.observeForever(allowedUIObserver)
        }

        val intent = activity?.intent
        if (intent != null) handleOnNewIntent(intent)
    }

    override fun handleOnNewIntent(intent: Intent) {
        Notificare.push().handleTrampolineIntent(intent)
    }

    // region Notificare push

    @PluginMethod
    public fun setAuthorizationOptions(call: PluginCall) {
        // no-op
        call.resolve()
    }

    @PluginMethod
    public fun setCategoryOptions(call: PluginCall) {
        // no-op
        call.resolve()
    }

    @PluginMethod
    public fun setPresentationOptions(call: PluginCall) {
        // no-op
        call.resolve()
    }

    @PluginMethod
    public fun hasRemoteNotificationsEnabled(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("result", Notificare.push().hasRemoteNotificationsEnabled)
            }
        )
    }

    @PluginMethod
    public fun allowedUI(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("result", Notificare.push().allowedUI)
            }
        )
    }

    @PluginMethod
    public fun enableRemoteNotifications(call: PluginCall) {
        Notificare.push().enableRemoteNotifications()
        call.resolve()
    }

    @PluginMethod
    public fun disableRemoteNotifications(call: PluginCall) {
        Notificare.push().disableRemoteNotifications()
        call.resolve()
    }

    // endregion

    public companion object {
        internal fun onMainThread(action: () -> Unit) = Handler(Looper.getMainLooper()).post(action)
    }
}
