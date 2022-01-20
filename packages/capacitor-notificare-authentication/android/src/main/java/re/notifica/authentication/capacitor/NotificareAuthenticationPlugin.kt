package re.notifica.authentication.capacitor

import android.util.Log
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.PluginMethod
import com.getcapacitor.PluginCall
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin

@CapacitorPlugin(name = "NotificareAuthenticationPlugin")
class NotificareAuthenticationPlugin : Plugin() {
    @PluginMethod
    fun echo(call: PluginCall) {
        val value = call.getString("value")
        Log.i("Echo", value!!)
        val ret = JSObject()
        ret.put("value", value)
        call.resolve(ret)
    }
}
