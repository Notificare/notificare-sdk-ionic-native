import Foundation
import Capacitor
import NotificareKit
import NotificareInboxKit

@objc(NotificareInboxPlugin)
public class NotificareInboxPlugin: CAPPlugin {
    public override func load() {
        EventBroker.instance.setup { self.notifyListeners($0, data: $1) }
        Notificare.shared.inbox().delegate = self
    }
    
    @objc func getItems(_ call: CAPPluginCall) {
        do {
            call.resolve([
                "result": try Notificare.shared.inbox().items.map { try $0.toJson() }
            ])
        } catch {
            call.reject(error.localizedDescription)
        }
    }
    
    @objc func getBadge(_ call: CAPPluginCall) {
        call.resolve([
            "result": Notificare.shared.inbox().badge
        ])
    }
    
    @objc func refresh(_ call: CAPPluginCall) {
        Notificare.shared.inbox().refresh()
        call.resolve()
    }
    
    @objc func open(_ call: CAPPluginCall) {
        guard let json = call.getObject("item") else {
            call.reject("Missing 'item' parameter.")
            return
        }
        
        let item: NotificareInboxItem
        
        do {
            item = try NotificareInboxItem.fromJson(json: json)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        Notificare.shared.inbox().open(item) { result in
            switch result {
            case let .success(notification):
                do {
                    call.resolve([
                        "result": try notification.toJson()
                    ])
                } catch {
                    call.reject(error.localizedDescription)
                }
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func markAsRead(_ call: CAPPluginCall) {
        guard let json = call.getObject("item") else {
            call.reject("Missing 'item' parameter.")
            return
        }
        
        let item: NotificareInboxItem
        
        do {
            item = try NotificareInboxItem.fromJson(json: json)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        Notificare.shared.inbox().markAsRead(item) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func markAllAsRead(_ call: CAPPluginCall) {
        Notificare.shared.inbox().markAllAsRead { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func remove(_ call: CAPPluginCall) {
        guard let json = call.getObject("item") else {
            call.reject("Missing 'item' parameter.")
            return
        }
        
        let item: NotificareInboxItem
        
        do {
            item = try NotificareInboxItem.fromJson(json: json)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        Notificare.shared.inbox().remove(item) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func clear(_ call: CAPPluginCall) {
        Notificare.shared.inbox().clear { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
}

extension NotificareInboxPlugin: NotificareInboxDelegate {
    public func notificare(_ notificareInbox: NotificareInbox, didUpdateInbox items: [NotificareInboxItem]) {
        do {
            EventBroker.instance.dispatchEvent("inbox_updated", data: [
                "items": try items.map { try $0.toJson() }
            ])
        } catch {
            NotificareLogger.error("Failed to emit the inbox_updated event.", error: error)
        }
    }
    
    public func notificare(_ notificareInbox: NotificareInbox, didUpdateBadge badge: Int) {
        EventBroker.instance.dispatchEvent("badge_updated", data: [
            "badge": badge
        ])
    }
}
