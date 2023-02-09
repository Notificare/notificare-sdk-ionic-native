import Foundation
import Capacitor
import NotificareKit
import NotificareUserInboxKit

@objc(NotificareUserInboxPlugin)
public class NotificareUserInboxPlugin: CAPPlugin {
    @objc func parseResponseFromJson(_ call: CAPPluginCall) {
        guard let json = call.getObject("json") else {
            call.reject("Missing 'json' parameter.")
            return
        }
        
        do {
            let response = try Notificare.shared.userInbox().parseResponse(json: json)
            
            call.resolve([
                "result": try response.toJson()
            ])
        } catch {
            call.reject(error.localizedDescription)
        }
    }
    
    @objc func parseResponseFromString(_ call: CAPPluginCall) {
        guard let json = call.getString("json") else {
            call.reject("Missing 'json' parameter.")
            return
        }
        
        do {
            let response = try Notificare.shared.userInbox().parseResponse(string: json)
            
            call.resolve([
                "result": try response.toJson()
            ])
        } catch {
            call.reject(error.localizedDescription)
        }
    }
    
    @objc func open(_ call: CAPPluginCall) {
        guard let json = call.getObject("item") else {
            call.reject("Missing 'item' parameter.")
            return
        }
        
        let item: NotificareUserInboxItem
        
        do {
            item = try NotificareUserInboxItem.fromJson(json: json)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        Notificare.shared.userInbox().open(item) { result in
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
        
        let item: NotificareUserInboxItem
        
        do {
            item = try NotificareUserInboxItem.fromJson(json: json)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        Notificare.shared.userInbox().markAsRead(item) { result in
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
        
        let item: NotificareUserInboxItem
        
        do {
            item = try NotificareUserInboxItem.fromJson(json: json)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        Notificare.shared.userInbox().remove(item) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
}
