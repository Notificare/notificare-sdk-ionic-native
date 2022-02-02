
import Foundation
import Capacitor
import NotificareKit

internal typealias NotifyListenersFunction = (_ eventName: String, _ data: [String: Any]?) -> Void

internal class EventBroker {
    private init() {}
    
    internal static let instance: EventBroker = .init()
    
    private var notifyListenersFunction: NotifyListenersFunction?
    private var queue:  [Event] = []
    
    func setup(_ notifyListenersFunction: @escaping NotifyListenersFunction) {
        self.notifyListenersFunction = notifyListenersFunction
        
        if !queue.isEmpty {
            NotificareLogger.debug("Processing event queue with ${eventQueue.size} items.")
            queue.forEach { dispatchEvent($0.name, data: $0.data)}
            queue.removeAll()
        }
    }
    
    internal func dispatchEvent(_ name: String, data: [String: Any]?) {
        guard let notifyListenersFunction = notifyListenersFunction else {
            queue.append(Event(name: name, data: data))
            return
        }
        
        notifyListenersFunction(name, data)
    }
    
    internal struct Event {
        let name: String
        let data: [String: Any]?
    }
}
