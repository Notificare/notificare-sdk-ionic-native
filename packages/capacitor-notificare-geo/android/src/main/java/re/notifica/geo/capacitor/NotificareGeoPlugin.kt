package re.notifica.geo.capacitor

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.provider.Settings
import android.util.Log
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.geo.NotificareGeo
import re.notifica.geo.ktx.geo
import re.notifica.geo.models.NotificareBeacon
import re.notifica.geo.models.NotificareLocation
import re.notifica.geo.models.NotificareRegion
import re.notifica.geo.models.toJson

@CapacitorPlugin(name = "NotificareGeoPlugin")
public class NotificareGeoPlugin : Plugin(), NotificareGeo.Listener {

    private companion object {
        private val TAG = NotificareGeoPlugin::class.java.simpleName
    }

    private var shouldShowRationale = false
    private var hasOnGoingPermissionRequest = false
    private var permissionRequestCall: PluginCall? = null

    private lateinit var permissionsLauncher: ActivityResultLauncher<Array<String>>

    override fun load() {
        logger.hasDebugLoggingEnabled = Notificare.options?.debugLoggingEnabled ?: false

        EventBroker.setup(this::notifyListeners)

        Notificare.geo().removeListener(this)
        Notificare.geo().addListener(this)

        permissionsLauncher = bridge.registerForActivityResult(
            ActivityResultContracts.RequestMultiplePermissions()
        ) { permissions ->
            val status = permissions
                .all { it.value }
                .let { granted ->
                    if (granted) {
                        PermissionStatus.GRANTED
                    } else {
                        if (!shouldShowRationale &&
                            !ActivityCompat.shouldShowRequestPermissionRationale(activity, permissions.keys.first())
                        ) {
                            PermissionStatus.PERMANENTLY_DENIED
                        } else {
                            PermissionStatus.DENIED
                        }
                    }
                }

            permissionRequestCall?.resolve(JSObject().put("result", status.rawValue))
            permissionRequestCall = null
            hasOnGoingPermissionRequest = false
        }
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
    public fun getMonitoredRegions(call: PluginCall) {
        try {
            call.resolve(
                JSObject().apply {
                    put("result", JSArray(Notificare.geo().monitoredRegions.map { it.toJson() }))
                }
            )
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
        }
    }

    @PluginMethod
    public fun getEnteredRegions(call: PluginCall) {
        try {
            call.resolve(
                JSObject().apply {
                    put("result", JSArray(Notificare.geo().enteredRegions.map { it.toJson() }))
                }
            )
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
        }
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

    @PluginMethod
    public fun checkPermissionStatus(call: PluginCall) {
        val permission = call.getString("permission")
            .let { str ->
                if (str == null) {
                    call.reject("Missing permission parameter.")
                    return
                }

                PermissionGroup.parse(str) ?: run {
                    call.reject("Unsupported permission parameter: $str")
                    return
                }
            }

        val status = determinePermissionStatus(context, permission)
        call.resolve(JSObject().put("result", status.rawValue))
    }

    @PluginMethod
    public fun shouldShowPermissionRationale(call: PluginCall) {
        val permission = call.getString("permission")
            .let { str ->
                if (str == null) {
                    call.reject("Missing permission parameter.")
                    return
                }

                PermissionGroup.parse(str) ?: run {
                    call.reject("Unsupported permission parameter: $str")
                    return
                }
            }

        val activity = activity ?: run {
            logger.warning("Unable to acquire a reference to the current activity.")
            call.reject("Unable to acquire a reference to the current activity.")
            return
        }

        val manifestPermissions = getManifestPermissions(context, permission)

        if (manifestPermissions.isEmpty()) {
            logger.warning("No permissions found in the manifest for $permission")
            call.resolve(JSObject().put("result", false))
            return
        }

        val showRationale = ActivityCompat.shouldShowRequestPermissionRationale(activity, manifestPermissions.first())
        call.resolve(JSObject().put("result", showRationale))
    }

    @PluginMethod
    public fun presentPermissionRationale(call: PluginCall) {
        val permission = call.getString("permission")
            .let { str ->
                if (str == null) {
                    call.reject("Missing permission parameter.")
                    return
                }

                PermissionGroup.parse(str) ?: run {
                    call.reject("Unsupported permission parameter: $str")
                    return
                }
            }

        val rationale = call.getObject("rationale") ?: run {
            call.reject("Missing rationale parameter.")
            return
        }

        val activity = activity ?: run {
            logger.warning("Unable to acquire a reference to the current activity.")
            call.reject("Unable to acquire a reference to the current activity.")
            return
        }

        val title = rationale.getString("title")
        val message = rationale.getString("message")
        val buttonText = rationale.getString("buttonText") ?: context.getString(android.R.string.ok)

        try {
            logger.debug("Presenting permission rationale for '$permission'.")

            activity.runOnUiThread {
                AlertDialog.Builder(activity)
                    .setTitle(title)
                    .setMessage(message)
                    .setCancelable(false)
                    .setPositiveButton(buttonText, null)
                    .setOnDismissListener { call.resolve() }
                    .show()
            }
        } catch (e: Exception) {
            call.reject("Unable to present the rationale alert.", e)
        }
    }

    @PluginMethod
    public fun requestPermission(call: PluginCall) {
        val permission = call.getString("permission")
            .let { str ->
                if (str == null) {
                    call.reject("Missing permission parameter.")
                    return
                }

                PermissionGroup.parse(str) ?: run {
                    call.reject("Unsupported permission parameter: $str")
                    return
                }
            }

        if (hasOnGoingPermissionRequest) {
            logger.warning("A request for permissions is already running, please wait for it to finish before doing another request.")
            call.reject("A request for permissions is already running, please wait for it to finish before doing another request.")
            return
        }

        val status = determinePermissionStatus(context, permission)
        if (status == PermissionStatus.GRANTED) {
            call.resolve(JSObject().put("result", status.rawValue))
            return
        }

        val manifestPermissions = getManifestPermissions(context, permission)

        if (manifestPermissions.isEmpty()) {
            logger.warning("No permissions found in the manifest for $permission")
            call.resolve(JSObject().put("result", PermissionStatus.DENIED.rawValue))
            return
        }

        shouldShowRationale = ActivityCompat.shouldShowRequestPermissionRationale(activity, manifestPermissions.first())
        hasOnGoingPermissionRequest = true
        permissionRequestCall = call

        permissionsLauncher.launch(manifestPermissions.toTypedArray())
    }

    @PluginMethod
    public fun openAppSettings(call: PluginCall) {
        try {
            val packageName = Uri.fromParts("package", context.packageName, null)
            context.startActivity(
                Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, packageName)
                    .addCategory(Intent.CATEGORY_DEFAULT)
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    .addFlags(Intent.FLAG_ACTIVITY_NO_HISTORY)
                    .addFlags(Intent.FLAG_ACTIVITY_EXCLUDE_FROM_RECENTS)
            )

            call.resolve()
        } catch (e: Exception) {
            call.reject("Unable to open the app settings.", e)
        }
    }

    // region NotificareGeo.Listener

    override fun onLocationUpdated(location: NotificareLocation) {
        try {
            EventBroker.dispatchEvent("location_updated", location.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the location_updated event.", e)
        }
    }

    override fun onRegionEntered(region: NotificareRegion) {
        try {
            EventBroker.dispatchEvent("region_entered", region.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the region_entered event.", e)
        }
    }

    override fun onRegionExited(region: NotificareRegion) {
        try {
            EventBroker.dispatchEvent("region_exited", region.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the region_exited event.", e)
        }
    }

    override fun onBeaconEntered(beacon: NotificareBeacon) {
        try {
            EventBroker.dispatchEvent("beacon_entered", beacon.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the beacon_entered event.", e)
        }
    }

    override fun onBeaconExited(beacon: NotificareBeacon) {
        try {
            EventBroker.dispatchEvent("beacon_exited", beacon.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the beacon_exited event.", e)
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
            logger.error("Failed to emit the beacons_ranged event.", e)
        }
    }

    // endregion

    private fun determinePermissionStatus(context: Context, permission: PermissionGroup): PermissionStatus {
        if (permission == PermissionGroup.BLUETOOTH) {
            return checkBluetoothPermissionStatus(context)
        }

        if (permission == PermissionGroup.BLUETOOTH_SCAN && Build.VERSION.SDK_INT < Build.VERSION_CODES.S) {
            return checkBluetoothPermissionStatus(context)
        }

        val manifestPermissions = getManifestPermissions(context, permission)

        // If no permissions were found there's an issue and the permission is not set in the Android Manifest.
        if (manifestPermissions.isEmpty()) {
            logger.warning("No permissions found in the manifest for $permission")
            return PermissionStatus.DENIED
        }

        val granted = manifestPermissions.all {
            ContextCompat.checkSelfPermission(context, it) == PackageManager.PERMISSION_GRANTED
        }

        return if (granted) PermissionStatus.GRANTED else PermissionStatus.DENIED
    }

    private fun getManifestPermissions(context: Context, permission: PermissionGroup): List<String> {
        val permissions = mutableListOf<String>()

        when (permission) {
            PermissionGroup.LOCATION_WHEN_IN_USE -> {
                if (hasPermissionInManifest(context, Manifest.permission.ACCESS_COARSE_LOCATION))
                    permissions.add(Manifest.permission.ACCESS_COARSE_LOCATION)

                if (hasPermissionInManifest(context, Manifest.permission.ACCESS_FINE_LOCATION))
                    permissions.add(Manifest.permission.ACCESS_FINE_LOCATION)
            }
            PermissionGroup.LOCATION_ALWAYS -> {
                // Note that the LOCATION_ALWAYS will deliberately request LOCATION_WHEN_IN_USE
                // case on pre Android Q devices. The ACCESS_BACKGROUND_LOCATION permission was only
                // introduced in Android Q, before it should be treated as the ACCESS_COARSE_LOCATION or
                // ACCESS_FINE_LOCATION.
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    if (hasPermissionInManifest(context, Manifest.permission.ACCESS_BACKGROUND_LOCATION))
                        permissions.add(Manifest.permission.ACCESS_BACKGROUND_LOCATION)
                } else {
                    permissions.addAll(getManifestPermissions(context, PermissionGroup.LOCATION_WHEN_IN_USE))
                }
            }
            PermissionGroup.BLUETOOTH_SCAN -> {
                // The BLUETOOTH_SCAN permission is introduced in Android S, meaning we should
                // not handle permissions on pre Android S devices.
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                    if (hasPermissionInManifest(context, Manifest.permission.BLUETOOTH_SCAN))
                        permissions.add(Manifest.permission.BLUETOOTH_SCAN)
                } else {
                    permissions.addAll(getManifestPermissions(context, PermissionGroup.BLUETOOTH))
                }
            }
            PermissionGroup.BLUETOOTH -> {
                if (hasPermissionInManifest(context, Manifest.permission.BLUETOOTH))
                    permissions.add(Manifest.permission.BLUETOOTH)
            }
        }

        return permissions
    }

    private fun hasPermissionInManifest(context: Context, permission: String): Boolean {
        try {
            val info = context.packageManager.getPackageInfo(context.packageName, PackageManager.GET_PERMISSIONS)
            if (info == null) {
                Log.d(TAG, "Unable to get Package info, will not be able to determine permissions to request.")
                return false
            }

            for (r in info.requestedPermissions) {
                if (r == permission) {
                    return true
                }
            }
        } catch (ex: Exception) {
            Log.d(TAG, "Unable to check manifest for permission: ", ex)
        }

        return false
    }

    private fun checkBluetoothPermissionStatus(context: Context): PermissionStatus {
        val manifestPermissions = getManifestPermissions(context, PermissionGroup.BLUETOOTH)

        if (manifestPermissions.isEmpty()) {
            logger.warning("Bluetooth permission missing in the manifest.")
            return PermissionStatus.DENIED
        }

        return PermissionStatus.GRANTED
    }

    internal enum class PermissionGroup {
        LOCATION_WHEN_IN_USE,
        LOCATION_ALWAYS,
        BLUETOOTH_SCAN,
        BLUETOOTH;

        internal val rawValue: String
            get() = when (this) {
                LOCATION_WHEN_IN_USE -> "location_when_in_use"
                LOCATION_ALWAYS -> "location_always"
                BLUETOOTH_SCAN -> "bluetooth_scan"
                BLUETOOTH -> "bluetooth"
            }

        internal companion object {
            internal fun parse(permission: String): PermissionGroup? {
                values().forEach {
                    if (it.rawValue == permission) return it
                }

                return null
            }
        }
    }

    internal enum class PermissionStatus {
        DENIED,
        GRANTED,
        PERMANENTLY_DENIED;

        internal val rawValue: String
            get() = when (this) {
                DENIED -> "denied"
                GRANTED -> "granted"
                PERMANENTLY_DENIED -> "permanently_denied"
            }

        internal companion object {
            internal fun parse(status: String): PermissionStatus? {
                values().forEach {
                    if (it.rawValue == status) return it
                }

                return null
            }
        }
    }
}
