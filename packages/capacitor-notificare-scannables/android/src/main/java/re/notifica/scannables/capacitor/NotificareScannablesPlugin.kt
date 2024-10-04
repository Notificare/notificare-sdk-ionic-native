package re.notifica.scannables.capacitor

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.NotificareCallback
import re.notifica.scannables.NotificareScannables
import re.notifica.scannables.ktx.scannables
import re.notifica.scannables.models.NotificareScannable
import re.notifica.scannables.models.toJson

@CapacitorPlugin(name = "NotificareScannablesPlugin")
public class NotificareScannablesPlugin : Plugin(), NotificareScannables.ScannableSessionListener {
    override fun load() {
        logger.hasDebugLoggingEnabled = Notificare.options?.debugLoggingEnabled ?: false

        EventBroker.setup(this::notifyListeners)

        Notificare.scannables().removeListener(this)
        Notificare.scannables().addListener(this)
    }

    @PluginMethod
    public fun canStartNfcScannableSession(call: PluginCall) {
        call.resolve(JSObject().apply {
            put("result", Notificare.scannables().canStartNfcScannableSession)
        })
    }

    @PluginMethod
    public fun startScannableSession(call: PluginCall) {
        val activity = activity ?: run {
            call.reject("Cannot start a scannable session without an activity.")
            return
        }

        Notificare.scannables().startScannableSession(activity)
        call.resolve()
    }

    @PluginMethod
    public fun startNfcScannableSession(call: PluginCall) {
        val activity = activity ?: run {
            call.reject("Cannot start a scannable session without an activity.")
            return
        }

        Notificare.scannables().startNfcScannableSession(activity)
        call.resolve()
    }

    @PluginMethod
    public fun startQrCodeScannableSession(call: PluginCall) {
        val activity = activity ?: run {
            call.reject("Cannot start a scannable session without an activity.")
            return
        }

        Notificare.scannables().startQrCodeScannableSession(activity)
        call.resolve()
    }

    @PluginMethod
    public fun fetch(call: PluginCall) {
        val tag = call.getString("tag") ?: run {
            call.reject("Missing 'tag' parameter.")
            return
        }

        Notificare.scannables().fetch(tag, object : NotificareCallback<NotificareScannable> {
            override fun onSuccess(result: NotificareScannable) {
                try {
                    call.resolve(
                        JSObject().apply {
                            put("result", result.toJson())
                        }
                    )
                } catch (e: Exception) {
                    call.reject(e.localizedMessage)
                }
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    // region NotificareScannables.ScannableSessionListener

    override fun onScannableDetected(scannable: NotificareScannable) {
        try {
            EventBroker.dispatchEvent("scannable_detected", scannable.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the scannable_detected event.", e)
        }
    }

    override fun onScannableSessionError(error: Exception) {
        try {
            EventBroker.dispatchEvent("scannable_session_failed", JSObject().apply {
                put("error", error.localizedMessage)
            })
        } catch (e: Exception) {
            logger.error("Failed to emit the scannable_session_failed event.", e)
        }
    }

    // endregion
}
