package re.notifica.push.capacitor

import com.getcapacitor.JSObject
import org.json.JSONObject

internal typealias NotifyListenersFunction = (name: String, data: JSObject?, retainUntilConsumed: Boolean) -> Unit

internal object EventBroker {
    private var notifyListenersFunction: NotifyListenersFunction? = null
    private val eventQueue = mutableListOf<Event>()

    fun setup(notifyListenersFunction: NotifyListenersFunction) {
        this.notifyListenersFunction = notifyListenersFunction

        if (eventQueue.isNotEmpty()) {
            logger.debug("Processing event queue with ${eventQueue.size} items.")
            eventQueue.forEach { notifyListenersFunction(it.name, it.data, it.retainUntilConsumed) }
            eventQueue.clear()
        }
    }

    fun dispatchEvent(name: String, data: JSONObject?, retainUntilConsumed: Boolean = false) {
        dispatchEvent(name, data?.let { JSObject.fromJSONObject(it) }, retainUntilConsumed)
    }

    fun dispatchEvent(name: String, data: JSObject?, retainUntilConsumed: Boolean = false) {
        val notifyListenersFunction = notifyListenersFunction ?: run {
            eventQueue.add(Event(name, data, retainUntilConsumed))
            return
        }

        notifyListenersFunction(name, data, retainUntilConsumed)
    }

    private data class Event(
        val name: String,
        val data: JSObject?,
        val retainUntilConsumed: Boolean
    )
}
