package re.notifica.assets.capacitor

import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.NotificareCallback
import re.notifica.assets.ktx.assets
import re.notifica.assets.models.NotificareAsset

@CapacitorPlugin(name = "NotificareAssetsPlugin")
public class NotificareAssetsPlugin : Plugin() {
    @PluginMethod
    public fun fetch(call: PluginCall) {
        val group = call.getString("group") ?: run {
            call.reject("Missing 'group' parameter.")
            return
        }

        Notificare.assets().fetch(group, object : NotificareCallback<List<NotificareAsset>> {
            override fun onSuccess(result: List<NotificareAsset>) {
                try {
                    call.resolve(
                        JSObject().apply {
                            put("result", JSArray().apply {
                                result.forEach { put(it.toJson()) }
                            })
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
}
