package re.notifica.geo.capacitor

import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.geo.NotificareGeo
import re.notifica.geo.ktx.geo
import re.notifica.geo.models.NotificareBeacon
import re.notifica.geo.models.NotificareLocation
import re.notifica.geo.models.NotificareRegion
import re.notifica.geo.models.toJson
import re.notifica.internal.NotificareLogger

@CapacitorPlugin(name = "NotificareGeoPlugin")
public class NotificareGeoPlugin : Plugin(), NotificareGeo.Listener {
    override fun load() {
        EventBroker.setup(this::notifyListeners)

        Notificare.geo().removeListener(this)
        Notificare.geo().addListener(this)
    }

    @PluginMethod
    public fun hasLocationServicesEnabled(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("result", Notificare.geo().hasLocationServicesEnabled)
            }
        )
    }

    @PluginMethod
    public fun hasBluetoothEnabled(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("result", Notificare.geo().hasBluetoothEnabled)
            }
        )
    }

    @PluginMethod
    public fun enableLocationUpdates(call: PluginCall) {
        Notificare.geo().enableLocationUpdates()
        call.resolve()
    }

    @PluginMethod
    public fun disableLocationUpdates(call: PluginCall) {
        Notificare.geo().disableLocationUpdates()
        call.resolve()
    }

    // region NotificareGeo.Listener

    override fun onLocationUpdated(location: NotificareLocation) {
        try {
            EventBroker.dispatchEvent("location_updated", location.toJson())
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the location_updated event.", e)
        }
    }

    override fun onRegionEntered(region: NotificareRegion) {
        try {
            EventBroker.dispatchEvent("region_entered", region.toJson())
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the region_entered event.", e)
        }
    }

    override fun onRegionExited(region: NotificareRegion) {
        try {
            EventBroker.dispatchEvent("region_exited", region.toJson())
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the region_exited event.", e)
        }
    }

    override fun onBeaconEntered(beacon: NotificareBeacon) {
        try {
            EventBroker.dispatchEvent("beacon_entered", beacon.toJson())
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the beacon_entered event.", e)
        }
    }

    override fun onBeaconExited(beacon: NotificareBeacon) {
        try {
            EventBroker.dispatchEvent("beacon_exited", beacon.toJson())
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the beacon_exited event.", e)
        }
    }

    override fun onBeaconsRanged(region: NotificareRegion, beacons: List<NotificareBeacon>) {
        try {
            val data = JSObject()
            data.put("region", region.toJson())
            data.put("beacons", JSArray().apply {
                beacons.forEach { put(it.toJson()) }
            })

            EventBroker.dispatchEvent("beacons_ranged", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the beacons_ranged event.", e)
        }
    }

    // endregion
}
