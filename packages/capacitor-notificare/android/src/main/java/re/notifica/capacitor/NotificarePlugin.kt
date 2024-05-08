package re.notifica.capacitor

import android.content.Intent
import android.net.Uri
import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin
import org.json.JSONObject
import re.notifica.Notificare
import re.notifica.NotificareCallback
import re.notifica.ktx.device
import re.notifica.ktx.events
import re.notifica.models.*

@CapacitorPlugin(name = "NotificarePlugin")
public class NotificarePlugin : Plugin() {
    override fun load() {
        EventBroker.setup(this::notifyListeners)
        Notificare.intentReceiver = NotificarePluginIntentReceiver::class.java

        val intent = activity?.intent
        if (intent != null) handleOnNewIntent(intent)
    }

    override fun handleOnNewIntent(intent: Intent) {
        // Try handling the test device intent.
        if (Notificare.handleTestDeviceIntent(intent)) return

        // Try handling the dynamic link intent.
        val activity = activity
        if (activity != null && Notificare.handleDynamicLinkIntent(activity, intent)) return

        val url = intent.data?.toString()
        if (url != null) {
            EventBroker.dispatchEvent("url_opened", JSObject().apply {
                put("url", url)
            })
        }
    }

    // region Notificare

    @PluginMethod
    public fun isConfigured(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("result", Notificare.isConfigured)
            }
        )
    }

    @PluginMethod
    public fun isReady(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("result", Notificare.isReady)
            }
        )
    }

    @PluginMethod
    public fun launch(call: PluginCall) {
        Notificare.launch()
        call.resolve()
    }

    @PluginMethod
    public fun unlaunch(call: PluginCall) {
        Notificare.unlaunch()
        call.resolve()
    }

    @PluginMethod
    public fun getApplication(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("result", Notificare.application?.toJson())
            }
        )
    }

    @PluginMethod
    public fun fetchApplication(call: PluginCall) {
        Notificare.fetchApplication(object : NotificareCallback<NotificareApplication> {
            override fun onSuccess(result: NotificareApplication) {
                call.resolve(
                    JSObject().apply {
                        put("result", result.toJson())
                    }
                )
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun fetchNotification(call: PluginCall) {
        val id = call.getString("id") ?: run {
            call.reject("Missing 'id' parameter.")
            return
        }

        Notificare.fetchNotification(id, object : NotificareCallback<NotificareNotification> {
            override fun onSuccess(result: NotificareNotification) {
                call.resolve(
                    JSObject().apply {
                        put("result", result.toJson())
                    }
                )
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun fetchDynamicLink(call: PluginCall) {
        val url = call.getString("url") ?: run {
            call.reject("Missing 'url' parameter.")
            return
        }

        val uri = Uri.parse(url)

        Notificare.fetchDynamicLink(uri, object : NotificareCallback<NotificareDynamicLink> {
            override fun onSuccess(result: NotificareDynamicLink) {
                call.resolve(
                    JSObject().apply {
                        put("result", result.toJson())
                    }
                )
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun canEvaluateDeferredLink(call: PluginCall) {
        Notificare.canEvaluateDeferredLink(object : NotificareCallback<Boolean> {
            override fun onSuccess(result: Boolean) {
                call.resolve(
                    JSObject().apply {
                        put("result", result)
                    }
                )
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun evaluateDeferredLink(call: PluginCall) {
        Notificare.evaluateDeferredLink(object : NotificareCallback<Boolean> {
            override fun onSuccess(result: Boolean) {
                call.resolve(
                    JSObject().apply {
                        put("result", result)
                    }
                )
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    // endregion

    // region Notificare device module

    @PluginMethod
    public fun getCurrentDevice(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("result", Notificare.device().currentDevice?.toJson())
            }
        )
    }

    @PluginMethod
    public fun getPreferredLanguage(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("result", Notificare.device().preferredLanguage)
            }
        )
    }

    @PluginMethod
    public fun updatePreferredLanguage(call: PluginCall) {
        val language = call.getString("language")

        Notificare.device().updatePreferredLanguage(language, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun register(call: PluginCall) {
        val userId = call.getString("userId")
        val userName = call.getString("userName")

        Notificare.device().register(userId, userName, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun fetchTags(call: PluginCall) {
        Notificare.device().fetchTags(object : NotificareCallback<List<String>> {
            override fun onSuccess(result: List<String>) {
                call.resolve(
                    JSObject().apply {
                        put("result", JSArray(result))
                    }
                )
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun addTag(call: PluginCall) {
        val tag = call.getString("tag") ?: run {
            call.reject("Missing 'tag' parameter.")
            return
        }

        Notificare.device().addTag(tag, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun addTags(call: PluginCall) {
        val tags = call.getArray("tags", null)?.toList<String>() ?: run {
            call.reject("Missing 'tags' parameter.")
            return
        }

        Notificare.device().addTags(tags, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun removeTag(call: PluginCall) {
        val tag = call.getString("tag") ?: run {
            call.reject("Missing 'tag' parameter.")
            return
        }

        Notificare.device().removeTag(tag, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun removeTags(call: PluginCall) {
        val tags = call.getArray("tags", null)?.toList<String>() ?: run {
            call.reject("Missing 'tags' parameter.")
            return
        }

        Notificare.device().removeTags(tags, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun clearTags(call: PluginCall) {
        Notificare.device().clearTags(object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun fetchDoNotDisturb(call: PluginCall) {
        Notificare.device().fetchDoNotDisturb(object : NotificareCallback<NotificareDoNotDisturb?> {
            override fun onSuccess(result: NotificareDoNotDisturb?) {
                call.resolve(
                    JSObject().apply {
                        put("result", result?.toJson())
                    }
                )
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun updateDoNotDisturb(call: PluginCall) {
        val dnd = call.getObject("dnd", null)?.let { NotificareDoNotDisturb.fromJson(it) } ?: run {
            call.reject("Missing 'dnd' parameter.")
            return
        }

        Notificare.device().updateDoNotDisturb(dnd, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun clearDoNotDisturb(call: PluginCall) {
        Notificare.device().clearDoNotDisturb(object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun fetchUserData(call: PluginCall) {
        Notificare.device().fetchUserData(object : NotificareCallback<NotificareUserData> {
            override fun onSuccess(result: NotificareUserData) {
                val userData = JSONObject().apply {
                    result.forEach {
                        put(it.key, it.value)
                    }
                }

                call.resolve(
                    JSObject().apply {
                        put("result", userData)
                    }
                )
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun updateUserData(call: PluginCall) {
        val json = call.getObject("userData", null) ?: run {
            call.reject("Missing 'userData' parameter.")
            return
        }

        val userData: NotificareUserData = mutableMapOf<String, String>().apply {
            val iterator = json.keys()
            while (iterator.hasNext()) {
                val key = iterator.next()
                val value = json.getString(key)

                if (value != null) {
                    put(key, value)
                }
            }
        }

        Notificare.device().updateUserData(userData, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    // endregion

    // region Notificare events module

    @PluginMethod
    public fun logCustom(call: PluginCall) {
        val event = call.getString("event") ?: run {
            call.reject("Missing 'event' parameter.")
            return
        }

        val data: NotificareEventData?

        try {
            data = call.getObject("data", null)?.let { NotificareEvent.createData(it) }
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        Notificare.events().logCustom(event, data, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    // endregion
}
