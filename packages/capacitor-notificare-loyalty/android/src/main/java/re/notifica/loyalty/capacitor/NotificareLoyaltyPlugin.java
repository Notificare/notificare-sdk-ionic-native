package re.notifica.loyalty.capacitor;

import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "NotificareLoyaltyPlugin")
public class NotificareLoyaltyPlugin extends Plugin {

    @PluginMethod
    public void echo(PluginCall call) {
        String value = call.getString("value");
        Log.i("Echo", value);

        JSObject ret = new JSObject();
        ret.put("value", value);
        call.resolve(ret);
    }
}
