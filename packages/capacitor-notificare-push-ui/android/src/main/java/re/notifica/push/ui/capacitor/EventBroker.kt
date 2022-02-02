package re.notifica.push.ui.capacitor

import com.getcapacitor.JSObject
import org.json.JSONObject
import re.notifica.internal.NotificareLogger

internal typealias NotifyListenersFunction = (name: String, data: JSObject?) -> Unit

internal object EventBroker {
    private var notifyListenersFunction: NotifyListenersFunction? = null
    private val eventQueue = mutableListOf<Event>()

    fun setup(notifyListenersFunction: NotifyListenersFunction) {
        this.notifyListenersFunction = notifyListenersFunction

        if (eventQueue.isNotEmpty()) {
            NotificareLogger.debug("Processing event queue with ${eventQueue.size} items.")
            eventQueue.forEach { notifyListenersFunction(it.name, it.data) }
            eventQueue.clear()
        }
    }

    fun dispatchEvent(name: String, data: JSONObject?) {
        dispatchEvent(name, data?.let { JSObject.fromJSONObject(it) })
    }

    fun dispatchEvent(name: String, data: JSObject?) {
        val notifyListenersFunction = notifyListenersFunction ?: run {
            eventQueue.add(Event(name, data))
            return
        }

        notifyListenersFunction(name, data)
    }

    private data class Event(
        val name: String,
        val data: JSObject?,
    )
}
