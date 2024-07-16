import Foundation
import Capacitor
import NotificareKit
import NotificarePushKit

@objc(NotificarePushPlugin)
public class NotificarePushPlugin: CAPPlugin {
    private let notificationCenter = UNUserNotificationCenter.current()

    public override func load() {
        EventBroker.instance.setup { self.notifyListeners($0, data: $1) }
        Notificare.shared.push().delegate = self
    }

    @objc func setAuthorizationOptions(_ call: CAPPluginCall) {
        guard let options = call.getArray("options", String.self) else {
            call.reject("Missing 'options' parameter.")
            return
        }

        var authorizationOptions: UNAuthorizationOptions = []

        options.forEach { option in
            if option == "alert" {
                authorizationOptions = [authorizationOptions, .alert]
            }

            if option == "badge" {
                authorizationOptions = [authorizationOptions, .badge]
            }

            if option == "sound" {
                authorizationOptions = [authorizationOptions, .sound]
            }

            if option == "carPlay" {
                authorizationOptions = [authorizationOptions, .carPlay]
            }

            if #available(iOS 12.0, *) {
                if option == "providesAppNotificationSettings" {
                    authorizationOptions = [authorizationOptions, .providesAppNotificationSettings]
                }

                if option == "provisional" {
                    authorizationOptions = [authorizationOptions, .provisional]
                }

                if option == "criticalAlert" {
                    authorizationOptions = [authorizationOptions, .criticalAlert]
                }
            }

            if #available(iOS 13.0, *) {
                if option == "announcement" {
                    authorizationOptions = [authorizationOptions, .announcement]
                }
            }
        }

        Notificare.shared.push().authorizationOptions = authorizationOptions
        call.resolve()
    }

    @objc func setCategoryOptions(_ call: CAPPluginCall) {
        guard let options = call.getArray("options", String.self) else {
            call.reject("Missing 'options' parameter.")
            return
        }

        var categoryOptions: UNNotificationCategoryOptions = []

        options.forEach { option in
            if option == "customDismissAction" {
                categoryOptions = [categoryOptions, .customDismissAction]
            }

            if option == "allowInCarPlay" {
                categoryOptions = [categoryOptions, .allowInCarPlay]
            }

            if #available(iOS 11.0, *) {
                if option == "hiddenPreviewsShowTitle" {
                    categoryOptions = [categoryOptions, .hiddenPreviewsShowTitle]
                }

                if option == "hiddenPreviewsShowSubtitle" {
                    categoryOptions = [categoryOptions, .hiddenPreviewsShowSubtitle]
                }
            }

            if #available(iOS 13.0, *) {
                if option == "allowAnnouncement" {
                    categoryOptions = [categoryOptions, .allowAnnouncement]
                }
            }
        }

        Notificare.shared.push().categoryOptions = categoryOptions
        call.resolve()
    }

    @objc func setPresentationOptions(_ call: CAPPluginCall) {
        guard let options = call.getArray("options", String.self) else {
            call.reject("Missing 'options' parameter.")
            return
        }

        var presentationOptions: UNNotificationPresentationOptions = []

        options.forEach { option in
            if #available(iOS 14.0, *) {
                if option == "banner" || option == "alert" {
                    presentationOptions = [presentationOptions, .banner]
                }

                if option == "list" {
                    presentationOptions = [presentationOptions, .list]
                }
            } else {
                if option == "alert" {
                    presentationOptions = [presentationOptions, .alert]
                }
            }

            if option == "badge" {
                presentationOptions = [presentationOptions, .badge]
            }

            if option == "sound" {
                presentationOptions = [presentationOptions, .sound]
            }
        }

        Notificare.shared.push().presentationOptions = presentationOptions
        call.resolve()
    }

    @objc func hasRemoteNotificationsEnabled(_ call: CAPPluginCall) {
        call.resolve([
            "result": Notificare.shared.push().hasRemoteNotificationsEnabled
        ])
    }

    @objc func getTransport(_ call: CAPPluginCall) {
        var response: PluginCallResultData = [:]
        if let transport = Notificare.shared.push().transport?.rawValue {
            response["result"] = transport
        }

        call.resolve(response)
    }

    @objc func getSubscriptionId(_ call: CAPPluginCall) {
        var response: PluginCallResultData = [:]
        if let subscriptionId = Notificare.shared.push().subscriptionId {
            response["result"] = subscriptionId
        }

        call.resolve(response)
    }

    @objc func allowedUI(_ call: CAPPluginCall) {
        call.resolve([
            "result": Notificare.shared.push().allowedUI
        ])
    }

    @objc func enableRemoteNotifications(_ call: CAPPluginCall) {
        Notificare.shared.push().enableRemoteNotifications { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func disableRemoteNotifications(_ call: CAPPluginCall) {
        Notificare.shared.push().disableRemoteNotifications { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func checkPermissionStatus(_ call: CAPPluginCall) {
        checkPermissionStatus { status in
            call.resolve(["result": status.rawValue])
        }
    }

    @objc func shouldShowPermissionRationale(_ call: CAPPluginCall) {
        call.resolve(["result": false])
    }

    @objc func presentPermissionRationale(_ call: CAPPluginCall) {
        call.reject("This method is not implemented in iOS.")
    }

    @objc func requestPermission(_ call: CAPPluginCall) {
        checkPermissionStatus { status in
            guard status != .granted && status != .permanentlyDenied else {
                call.resolve(["result": status.rawValue])
                return
            }

            let authorizationOptions = Notificare.shared.push().authorizationOptions

            self.notificationCenter.requestAuthorization(options: authorizationOptions) { (granted, error) in
                if error == nil {
                    call.resolve(granted ? ["result": PermissionStatus.granted.rawValue] : ["result": PermissionStatus.denied.rawValue])
                    return
                }

                call.reject("Unable to request notifications permission.", error?.localizedDescription)
            }
        }
    }

    @objc func openAppSettings(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard let url = URL(string: UIApplication.openSettingsURLString), UIApplication.shared.canOpenURL(url) else {
                call.reject("Unable to open the application settings.")
                return
            }

            UIApplication.shared.open(url) { success in
                if success {
                    call.resolve()
                } else {
                    call.reject("Unable to open the application settings.")
                }
            }
        }
    }

    private func checkPermissionStatus(_ completion: @escaping (PermissionStatus) -> Void) {
        notificationCenter.getNotificationSettings { status in
            var permissionStatus = PermissionStatus.denied

            if status.authorizationStatus == .authorized {
                permissionStatus = PermissionStatus.granted
            }

            if status.authorizationStatus == .denied {
                permissionStatus = PermissionStatus.permanentlyDenied
            }

            completion(permissionStatus)
        }
    }
}

extension NotificarePushPlugin: NotificarePushDelegate {
    public func notificare(_ notificarePush: NotificarePush, didReceiveNotification notification: NotificareNotification, deliveryMechanism: NotificareNotificationDeliveryMechanism) {
        do {
            let data: [String: Any] = [
                "notification": try notification.toJson(),
                "deliveryMechanism": deliveryMechanism.rawValue,
            ]

            EventBroker.instance.dispatchEvent("notification_info_received", data: data)
        } catch {
            NotificareLogger.error("Failed to emit the notification_info_received event.", error: error)
        }
    }

    public func notificare(_ notificarePush: NotificarePush, didReceiveSystemNotification notification: NotificareSystemNotification) {
        do {
            EventBroker.instance.dispatchEvent("system_notification_received", data: try notification.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the system_notification_received event.", error: error)
        }
    }

    public func notificare(_ notificarePush: NotificarePush, didReceiveUnknownNotification userInfo: [AnyHashable : Any]) {
        let data: [String: Any] = Dictionary(uniqueKeysWithValues: userInfo.compactMap {
            guard let key = $0.key as? String else {
                return nil
            }

            return (key, $0.value)
        })

        EventBroker.instance.dispatchEvent("unknown_notification_received", data: data)
    }

    public func notificare(_ notificarePush: NotificarePush, didOpenNotification notification: NotificareNotification) {
        do {
            EventBroker.instance.dispatchEvent("notification_opened", data: try notification.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the notification_opened event.", error: error)
        }
    }

    public func notificare(_ notificarePush: NotificarePush, didOpenUnknownNotification userInfo: [AnyHashable : Any]) {
        let data: [String: Any] = Dictionary(uniqueKeysWithValues: userInfo.compactMap {
            guard let key = $0.key as? String else {
                return nil
            }

            return (key, $0.value)
        })

        EventBroker.instance.dispatchEvent("unknown_notification_opened", data: data)
    }

    public func notificare(_ notificarePush: NotificarePush, didOpenAction action: NotificareNotification.Action, for notification: NotificareNotification) {
        do {
            let data = [
                "notification": try notification.toJson(),
                "action": try action.toJson(),
            ]

            EventBroker.instance.dispatchEvent("notification_action_opened", data: data)
        } catch {
            NotificareLogger.error("Failed to emit the notification_action_opened event.", error: error)
        }
    }

    public func notificare(_ notificarePush: NotificarePush, didOpenUnknownAction action: String, for notification: [AnyHashable : Any], responseText: String?) {
        let notificationMap: [String: Any] = Dictionary(uniqueKeysWithValues: notification.compactMap {
            guard let key = $0.key as? String else {
                return nil
            }

            return (key, $0.value)
        })

        var data: [String: Any] = [
            "notification": notificationMap,
            "action": action,
        ]

        if let responseText = responseText {
            data["responseText"] = responseText
        }

        EventBroker.instance.dispatchEvent("unknown_notification_action_opened", data: data)
    }

    public func notificare(_ notificarePush: NotificarePush, didChangeNotificationSettings granted: Bool) {
        EventBroker.instance.dispatchEvent("notification_settings_changed", data: ["granted": granted])
    }

    public func notificare(_ notificarePush: NotificarePush, shouldOpenSettings notification: NotificareNotification?) {
        do {
            EventBroker.instance.dispatchEvent("should_open_notification_settings", data: try notification?.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the should_open_notification_settings event.", error: error)
        }
    }

    public func notificare(_ notificarePush: NotificarePush, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        EventBroker.instance.dispatchEvent("failed_to_register_for_remote_notifications", data: ["error": error.localizedDescription])
    }
}

extension NotificarePushPlugin {
    internal enum PermissionStatus: String, CaseIterable {
        case denied = "denied"
        case granted = "granted"
        case permanentlyDenied = "permanently_denied"
    }
}

