package re.notifica.push.capacitor

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import androidx.activity.result.ActivityResultLauncher
import androidx.activity.result.contract.ActivityResultContracts
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AlertDialog
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat
import androidx.lifecycle.Observer
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.internal.NotificareLogger
import re.notifica.push.ktx.push

@CapacitorPlugin(name = "NotificarePushPlugin")
public class NotificarePushPlugin : Plugin() {
    private var shouldShowRationale = false
    private var hasOnGoingPermissionRequest = false
    private var permissionRequestCall: PluginCall? = null

    private lateinit var notificationsPermissionLauncher: ActivityResultLauncher<String>

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

        notificationsPermissionLauncher = bridge.registerForActivityResult(
            ActivityResultContracts.RequestPermission()
        ) { granted ->
            if (granted) {
                permissionRequestCall?.resolve(JSObject().put("result", PermissionStatus.GRANTED.rawValue))
            } else {
                if (!shouldShowRationale &&
                    !ActivityCompat.shouldShowRequestPermissionRationale(activity, PUSH_PERMISSION)
                ) {
                    permissionRequestCall?.resolve(
                        JSObject().put(
                            "result",
                            PermissionStatus.PERMANENTLY_DENIED.rawValue
                        )
                    )
                } else {
                    permissionRequestCall?.resolve(JSObject().put("result", PermissionStatus.DENIED.rawValue))
                }
            }

            shouldShowRationale = false
            hasOnGoingPermissionRequest = false
            permissionRequestCall = null
        }
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

    @PluginMethod
    public fun checkPermissionStatus(call: PluginCall) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
            val granted = NotificationManagerCompat.from(context.applicationContext).areNotificationsEnabled()
            call.resolve(
                JSObject().put(
                    "result",
                    if (granted) PermissionStatus.GRANTED.rawValue else PermissionStatus.PERMANENTLY_DENIED.rawValue
                )
            )
            return
        }

        val granted = ContextCompat.checkSelfPermission(context, PUSH_PERMISSION) == PackageManager.PERMISSION_GRANTED
        call.resolve(
            JSObject().put(
                "result",
                if (granted) PermissionStatus.GRANTED.rawValue else PermissionStatus.DENIED.rawValue
            )
        )
    }

    @PluginMethod
    public fun shouldShowPermissionRationale(call: PluginCall) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
            call.resolve(JSObject().put("result", false))
            return
        }

        val result = ActivityCompat.shouldShowRequestPermissionRationale(activity, PUSH_PERMISSION)

        call.resolve(JSObject().put("result", result))
    }

    @PluginMethod
    public fun presentPermissionRationale(call: PluginCall) {
        val rationale = call.getObject("rationale") ?: run {
            call.reject("Missing rationale parameter.")
            return
        }

        val activity = activity ?: run {
            NotificareLogger.warning("Unable to acquire a reference to the current activity.")
            call.reject("Unable to acquire a reference to the current activity.")
            return
        }

        val title = rationale.getString("title")
        val message = rationale.getString("message")
        val buttonText = rationale.getString("buttonText") ?: context.getString(android.R.string.ok)

        try {
            NotificareLogger.debug("Presenting permission rationale to open app settings.")

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
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) {
            val granted = NotificationManagerCompat.from(context.applicationContext).areNotificationsEnabled()

            call.resolve(
                JSObject().put(
                    "result",
                    if (granted) PermissionStatus.GRANTED.rawValue else PermissionStatus.PERMANENTLY_DENIED.rawValue
                )
            )

            return
        }

        if (hasOnGoingPermissionRequest) {
            NotificareLogger.warning("A request for permissions is already running, please wait for it to finish before doing another request.")
            call.reject("A request for permissions is already running, please wait for it to finish before doing another request.")
            return
        }

        val granted = ContextCompat.checkSelfPermission(context, PUSH_PERMISSION) == PackageManager.PERMISSION_GRANTED

        if (granted) {
            call.resolve(JSObject().put("result", PermissionStatus.GRANTED.rawValue))
            return
        }

        shouldShowRationale = ActivityCompat.shouldShowRequestPermissionRationale(activity, PUSH_PERMISSION)
        hasOnGoingPermissionRequest = true
        permissionRequestCall = call

        notificationsPermissionLauncher.launch(PUSH_PERMISSION)
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

    // endregion

    public companion object {
        @RequiresApi(Build.VERSION_CODES.TIRAMISU)
        private const val PUSH_PERMISSION = Manifest.permission.POST_NOTIFICATIONS
        internal fun onMainThread(action: () -> Unit) = Handler(Looper.getMainLooper()).post(action)
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
    }
}
