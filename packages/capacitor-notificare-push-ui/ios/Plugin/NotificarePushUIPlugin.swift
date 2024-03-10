import Foundation
import Capacitor
import NotificareKit
import NotificarePushUIKit

@objc(NotificarePushUIPlugin)
public class NotificarePushUIPlugin: CAPPlugin {
    private var rootViewController: UIViewController? {
        get {
            UIApplication.shared.delegate?.window??.rootViewController
        }
    }
    
    public override func load() {
        EventBroker.instance.setup { self.notifyListeners($0, data: $1) }
        Notificare.shared.pushUI().delegate = self
    }
    
    @objc func presentNotification(_ call: CAPPluginCall) {
        guard let json = call.getObject("notification") else {
            call.reject("Missing 'notification' parameter.")
            return
        }
        
        let notification: NotificareNotification
        
        do {
            notification = try NotificareNotification.fromJson(json: json)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        onMainThread {
            guard let rootViewController = self.rootViewController else {
                call.reject("Cannot present a notification with a nil root view controller.", nil)
                return
            }
            
            if notification.requiresViewController {
                let navigationController = self.createNavigationController()
                rootViewController.present(navigationController, animated: true) {
                    Notificare.shared.pushUI().presentNotification(notification, in: navigationController)
                    call.resolve()
                }
            } else {
                Notificare.shared.pushUI().presentNotification(notification, in: rootViewController)
                call.resolve()
            }
        }
    }
    
    @objc func presentAction(_ call: CAPPluginCall) {
        guard let notificationJson = call.getObject("notification") else {
            call.reject("Missing 'notification' parameter.")
            return
        }
        
        guard let actionJson = call.getObject("action") else {
            call.reject("Missing 'action' parameter.")
            return
        }
        
        let notification: NotificareNotification
        let action: NotificareNotification.Action
        
        do {
            notification = try NotificareNotification.fromJson(json: notificationJson)
            action = try NotificareNotification.Action.fromJson(json: actionJson)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        onMainThread {
            guard let rootViewController = self.rootViewController else {
                call.reject("Cannot present a notification with a nil root view controller.", nil)
                return
            }
            
            Notificare.shared.pushUI().presentAction(action, for: notification, in: rootViewController)
            call.resolve()
        }
    }
    
    private func createNavigationController() -> UINavigationController {
        let navigationController = UINavigationController()
        let theme = Notificare.shared.options?.theme(for: navigationController)
        
        if let colorStr = theme?.backgroundColor {
            navigationController.view.backgroundColor = UIColor(hexString: colorStr)
        } else {
            if #available(iOS 13.0, *) {
                navigationController.view.backgroundColor = .systemBackground
            } else {
                navigationController.view.backgroundColor = .white
            }
        }

        return navigationController
    }
    
    @objc private func onCloseClicked() {
        guard let rootViewController = rootViewController else {
            return
        }
        
        rootViewController.dismiss(animated: true, completion: nil)
    }
}

extension NotificarePushUIPlugin: NotificarePushUIDelegate {
    public func notificare(_ notificarePushUI: NotificarePushUI, willPresentNotification notification: NotificareNotification) {
        do {
            EventBroker.instance.dispatchEvent("notification_will_present", data: try notification.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the notification_will_present event.", error: error)
        }
    }
    
    public func notificare(_ notificarePushUI: NotificarePushUI, didPresentNotification notification: NotificareNotification) {
        do {
            EventBroker.instance.dispatchEvent("notification_presented", data: try notification.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the notification_presented event.", error: error)
        }
    }
    
    public func notificare(_ notificarePushUI: NotificarePushUI, didFinishPresentingNotification notification: NotificareNotification) {
        do {
            EventBroker.instance.dispatchEvent("notification_finished_presenting", data: try notification.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the notification_finished_presenting event.", error: error)
        }
    }
    
    public func notificare(_ notificarePushUI: NotificarePushUI, didFailToPresentNotification notification: NotificareNotification) {
        do {
            EventBroker.instance.dispatchEvent("notification_failed_to_present", data: try notification.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the notification_failed_to_present event.", error: error)
        }
    }
    
    public func notificare(_ notificarePushUI: NotificarePushUI, didClickURL url: URL, in notification: NotificareNotification) {
        do {
            EventBroker.instance.dispatchEvent("notification_url_clicked", data: [
                "notification": try notification.toJson(),
                "url": url.absoluteString,
            ])
        } catch {
            NotificareLogger.error("Failed to emit the notification_url_clicked event.", error: error)
        }
    }
    
    public func notificare(_ notificarePushUI: NotificarePushUI, willExecuteAction action: NotificareNotification.Action, for notification: NotificareNotification) {
        do {
            EventBroker.instance.dispatchEvent("action_will_execute", data: [
                "notification": try notification.toJson(),
                "action": try action.toJson(),
            ])
        } catch {
            NotificareLogger.error("Failed to emit the action_will_execute event.", error: error)
        }
    }
    
    public func notificare(_ notificarePushUI: NotificarePushUI, didExecuteAction action: NotificareNotification.Action, for notification: NotificareNotification) {
        do {
            EventBroker.instance.dispatchEvent("action_executed", data: [
                "notification": try notification.toJson(),
                "action": try action.toJson(),
            ])
        } catch {
            NotificareLogger.error("Failed to emit the action_executed event.", error: error)
        }
    }
    
    public func notificare(_ notificarePushUI: NotificarePushUI, didNotExecuteAction action: NotificareNotification.Action, for notification: NotificareNotification) {
        do {
            EventBroker.instance.dispatchEvent("action_not_executed", data: [
                "notification": try notification.toJson(),
                "action": try action.toJson(),
            ])
        } catch {
            NotificareLogger.error("Failed to emit the action_not_executed event.", error: error)
        }
    }
    
    public func notificare(_ notificarePushUI: NotificarePushUI, didFailToExecuteAction action: NotificareNotification.Action, for notification: NotificareNotification, error: Error?) {
        do {
            var data: [String: Any] = [
                "notification": try notification.toJson(),
                "action": try action.toJson(),
            ]
            
            if let error = error {
                data["error"] = error.localizedDescription
            }
            
            EventBroker.instance.dispatchEvent("action_failed_to_execute", data: data)
        } catch {
            NotificareLogger.error("Failed to emit the action_failed_to_execute event.", error: error)
        }
    }
    
    public func notificare(_ notificarePushUI: NotificarePushUI, didReceiveCustomAction url: URL, in action: NotificareNotification.Action, for notification: NotificareNotification) {
        do {
            EventBroker.instance.dispatchEvent("custom_action_received", data: [
                "notification": try notification.toJson(),
                "action": try action.toJson(),
                "url": url.absoluteString,
            ])
        } catch {
            NotificareLogger.error("Failed to emit the custom_action_received event.", error: error)
        }
    }
}

private func onMainThread(_ action: @escaping () -> Void) {
    DispatchQueue.main.async {
        action()
    }
}
