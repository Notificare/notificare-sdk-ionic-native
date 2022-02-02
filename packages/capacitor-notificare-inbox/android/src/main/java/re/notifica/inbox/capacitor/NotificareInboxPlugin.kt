package re.notifica.inbox.capacitor

import android.os.Handler
import android.os.Looper
import androidx.lifecycle.Observer
import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.NotificareCallback
import re.notifica.inbox.ktx.inbox
import re.notifica.inbox.models.NotificareInboxItem
import re.notifica.inbox.models.fromJson
import re.notifica.inbox.models.toJson
import re.notifica.internal.NotificareLogger
import re.notifica.models.NotificareNotification
import java.util.*

@CapacitorPlugin(name = "NotificareInboxPlugin")
public class NotificareInboxPlugin : Plugin() {
    private val itemsObserver = Observer<SortedSet<NotificareInboxItem>> { items ->
        if (items == null) return@Observer

        try {
            val data = JSObject()
            data.put("items", JSArray(items.map { it.toJson() }))

            EventBroker.dispatchEvent("inbox_updated", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the inbox_updated event.", e)
        }
    }

    private val badgeObserver = Observer<Int> { badge ->
        if (badge == null) return@Observer

        EventBroker.dispatchEvent("badge_updated", JSObject().apply {
            put("badge", badge)
        })
    }

    override fun load() {
        EventBroker.setup(this::notifyListeners)

        onMainThread {
            Notificare.inbox().observableItems.removeObserver(itemsObserver)
            Notificare.inbox().observableItems.observeForever(itemsObserver)

            Notificare.inbox().observableBadge.removeObserver(badgeObserver)
            Notificare.inbox().observableBadge.observeForever(badgeObserver)
        }
    }

    // region Notificare Inbox

    @PluginMethod
    public fun getItems(call: PluginCall) {
        try {
            call.resolve(
                JSObject().apply {
                    put("result", JSArray(Notificare.inbox().items.map { it.toJson() }))
                }
            )
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
        }
    }

    @PluginMethod
    public fun getBadge(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("result", Notificare.inbox().badge)
            }
        )
    }

    @PluginMethod
    public fun refresh(call: PluginCall) {
        Notificare.inbox().refresh()
        call.resolve()
    }

    @PluginMethod
    public fun open(call: PluginCall) {
        val json = call.getObject("item") ?: run {
            call.reject("Missing 'item' parameter.")
            return
        }

        val item: NotificareInboxItem = try {
            NotificareInboxItem.fromJson(json)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        Notificare.inbox().open(item, object : NotificareCallback<NotificareNotification> {
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

        val item: NotificareInboxItem = try {
            NotificareInboxItem.fromJson(json)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        Notificare.inbox().markAsRead(item, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun markAllAsRead(call: PluginCall) {
        Notificare.inbox().markAllAsRead(object : NotificareCallback<Unit> {
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

        val item: NotificareInboxItem = try {
            NotificareInboxItem.fromJson(json)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        Notificare.inbox().remove(item, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun clear(call: PluginCall) {
        Notificare.inbox().clear(object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    // endregion

    public companion object {
        internal fun onMainThread(action: () -> Unit) = Handler(Looper.getMainLooper()).post(action)
    }
}
