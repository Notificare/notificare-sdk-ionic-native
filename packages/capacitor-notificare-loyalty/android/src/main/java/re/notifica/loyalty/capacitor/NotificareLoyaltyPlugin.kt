package re.notifica.loyalty.capacitor

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.NotificareCallback
import re.notifica.loyalty.ktx.loyalty
import re.notifica.loyalty.models.NotificarePass

@CapacitorPlugin(name = "NotificareLoyaltyPlugin")
public class NotificareLoyaltyPlugin : Plugin() {
    @PluginMethod
    public fun fetchPassBySerial(call: PluginCall) {
        val serial = call.getString("serial") ?: run {
            call.reject("Missing 'serial' parameter.")
            return
        }

        Notificare.loyalty().fetchPassBySerial(serial, object : NotificareCallback<NotificarePass> {
            override fun onSuccess(result: NotificarePass) {
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

    @PluginMethod
    public fun fetchPassByBarcode(call: PluginCall) {
        val barcode = call.getString("barcode") ?: run {
            call.reject("Missing 'barcode' parameter.")
            return
        }

        Notificare.loyalty().fetchPassByBarcode(barcode, object : NotificareCallback<NotificarePass> {
            override fun onSuccess(result: NotificarePass) {
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

    @PluginMethod
    public fun present(call: PluginCall) {
        val json = call.getObject("pass") ?: run {
            call.reject("Missing 'pass' parameter.")
            return
        }

        val pass: NotificarePass = try {
            NotificarePass.fromJson(json)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        val activity = activity ?: run {
            call.reject("Cannot present a pass without an activity.")
            return
        }

        Notificare.loyalty().present(activity, pass)
        call.resolve()
    }
}
