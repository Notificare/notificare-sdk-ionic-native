package re.notifica.inbox.user.capacitor

import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.NotificareCallback
import re.notifica.inbox.user.ktx.userInbox
import re.notifica.inbox.user.models.NotificareUserInboxItem
import re.notifica.models.NotificareNotification


@CapacitorPlugin(name = "NotificareUserInboxPlugin")
public class NotificareUserInboxPlugin : Plugin() {
    @PluginMethod
    public fun parseResponseFromJson(call: PluginCall) {
        val json = call.getObject("json") ?: run {
            call.reject("Missing 'json' parameter.")
            return
        }

        try {
            val response = Notificare.userInbox().parseResponse(json)
            call.resolve(
                JSObject().apply {
                    put("result", response.toJson())
                }
            )
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
        }
    }

    @PluginMethod
    public fun parseResponseFromString(call: PluginCall) {
        val json = call.getString("json") ?: run {
            call.reject("Missing 'json' parameter.")
            return
        }

        try {
            val response = Notificare.userInbox().parseResponse(json)
            call.resolve(
                JSObject().apply {
                    put("result", response.toJson())
                }
            )
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
        }
    }

    @PluginMethod
    public fun open(call: PluginCall) {
        val json = call.getObject("item") ?: run {
            call.reject("Missing 'item' parameter.")
            return
        }

        val item: NotificareUserInboxItem = try {
            NotificareUserInboxItem.fromJson(json)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        Notificare.userInbox().open(item, object : NotificareCallback<NotificareNotification> {
            override fun onSuccess(result: NotificareNotification) {
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
    public fun markAsRead(call: PluginCall) {
        val json = call.getObject("item") ?: run {
            call.reject("Missing 'item' parameter.")
            return
        }

        val item: NotificareUserInboxItem = try {
            NotificareUserInboxItem.fromJson(json)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        Notificare.userInbox().markAsRead(item, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun remove(call: PluginCall) {
        val json = call.getObject("item") ?: run {
            call.reject("Missing 'item' parameter.")
            return
        }

        val item: NotificareUserInboxItem = try {
            NotificareUserInboxItem.fromJson(json)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        Notificare.userInbox().remove(item, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }
}
