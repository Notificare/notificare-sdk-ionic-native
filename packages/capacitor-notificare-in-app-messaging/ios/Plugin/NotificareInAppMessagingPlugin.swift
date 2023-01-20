import Foundation
import Capacitor
import NotificareKit
import NotificareInAppMessagingKit

@objc(NotificareInAppMessagingPlugin)
public class NotificareInAppMessagingPlugin: CAPPlugin {
    public override func load() {
        EventBroker.instance.setup { self.notifyListeners($0, data: $1) }
        Notificare.shared.inAppMessaging().delegate = self
    }
    
    @objc func hasMessagesSuppressed(_ call: CAPPluginCall) {
        call.resolve([
            "result": Notificare.shared.inAppMessaging().hasMessagesSuppressed
        ])
    }
    
    @objc func setMessagesSuppressed(_ call: CAPPluginCall) {
        guard let suppressed = call.getBool("suppressed") else {
            call.reject("Missing 'suppressed' parameter.")
            return
        }
        
        let evaluateContext = call.getBool("evaluateContext") ?? false
        
        Notificare.shared.inAppMessaging().setMessagesSuppressed(suppressed, evaluateContext: evaluateContext)
        
        call.resolve()
    }
}

extension NotificareInAppMessagingPlugin: NotificareInAppMessagingDelegate {
    public func notificare(_ notificare: NotificareInAppMessaging, didPresentMessage message: NotificareInAppMessage) {
        do {
            let data = [
                "message": try message.toJson()
            ]

            EventBroker.instance.dispatchEvent("message_presented", data: data)
        } catch {
            NotificareLogger.error("Failed to emit the message_presented event.", error: error)
        }
    }

    public func notificare(_ notificare: NotificareInAppMessaging, didFinishPresentingMessage message: NotificareInAppMessage) {
        do {
            let data = [
                "message": try message.toJson()
            ]

            EventBroker.instance.dispatchEvent("message_finished_presenting", data: data)
        } catch {
            NotificareLogger.error("Failed to emit the message_finished_presenting event.", error: error)
        }
    }

    public func notificare(_ notificare: NotificareInAppMessaging, didFailToPresentMessage message: NotificareInAppMessage) {
        do {
            let data = [
                "message": try message.toJson()
            ]

            EventBroker.instance.dispatchEvent("message_failed_to_present", data: data)
        } catch {
            NotificareLogger.error("Failed to emit the message_failed_to_present event.", error: error)
        }
    }

    public func notificare(_ notificare: NotificareInAppMessaging, didExecuteAction action: NotificareInAppMessage.Action, for message: NotificareInAppMessage) {
        do {
            let data = [
                "message": try message.toJson(),
                "action": try action.toJson(),
            ]

            EventBroker.instance.dispatchEvent("action_executed", data: data)
        } catch {
            NotificareLogger.error("Failed to emit the action_executed event.", error: error)
        }
    }

    public func notificare(_ notificare: NotificareInAppMessaging, didFailToExecuteAction action: NotificareInAppMessage.Action, for message: NotificareInAppMessage, error: Error?) {
        do {
            var data: [String: Any] = [
                "message": try message.toJson(),
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
}
