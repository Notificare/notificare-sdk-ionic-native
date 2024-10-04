package re.notifica.capacitor

import android.content.Context
import re.notifica.NotificareIntentReceiver
import re.notifica.models.NotificareApplication
import re.notifica.models.NotificareDevice

internal class NotificarePluginIntentReceiver : NotificareIntentReceiver() {

    override fun onReady(context: Context, application: NotificareApplication) {
        try {
            EventBroker.dispatchEvent("ready", application.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the ready event.", e)
        }
    }

    override fun onUnlaunched(context: Context) {
        EventBroker.dispatchEvent("unlaunched", null)
    }

    override fun onDeviceRegistered(context: Context, device: NotificareDevice) {
        try {
            EventBroker.dispatchEvent("device_registered", device.toJson())
        } catch (e: Exception) {
            logger.error("Failed to emit the device_registered event.", e)
        }
    }
}
