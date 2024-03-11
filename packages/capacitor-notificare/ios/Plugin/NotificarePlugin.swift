import Foundation
import Capacitor
import NotificareKit

@objc(NotificarePlugin)
public class NotificarePlugin: CAPPlugin {

    public override func load() {
        EventBroker.instance.setup { self.notifyListeners($0, data: $1) }
        Notificare.shared.delegate = self

        NotificationCenter.default.addObserver(self, selector: #selector(self.handleUrlOpened(notification:)), name: .capacitorOpenURL, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(self.handleUniversalLink(notification:)), name: .capacitorOpenUniversalLink, object: nil)
    }

    deinit {
        NotificationCenter.default.removeObserver(self, name: .capacitorOpenURL, object: nil)
        NotificationCenter.default.removeObserver(self, name: .capacitorOpenUniversalLink, object: nil)
    }

    @objc func handleUrlOpened(notification: NSNotification) {
        guard let object = notification.object as? [String: Any?], let url = object["url"] as? URL else {
            NotificareLogger.warning("Unprocessable url_opened event.")
            return
        }

        if Notificare.shared.handleTestDeviceUrl(url) {
            return
        }

        if Notificare.shared.handleDynamicLinkUrl(url) {
            return
        }

        EventBroker.instance.dispatchEvent("url_opened", data: ["url": url.absoluteString])
    }

    @objc func handleUniversalLink(notification: NSNotification) {
        guard let object = notification.object as? [String: Any?], let url = object["url"] as? URL else {
            NotificareLogger.warning("Unprocessable universal_link event.")
            return
        }

        if Notificare.shared.handleTestDeviceUrl(url) {
            return
        }

        _ = Notificare.shared.handleDynamicLinkUrl(url)
    }

    // MARK: - Notificare

    @objc func isConfigured(_ call: CAPPluginCall) {
        call.resolve([
            "result": Notificare.shared.isConfigured,
        ])
    }

    @objc func isReady(_ call: CAPPluginCall) {
        call.resolve([
            "result": Notificare.shared.isReady,
        ])
    }

    @objc func launch(_ call: CAPPluginCall) {
        onMainThread {
            Notificare.shared.launch()
            call.resolve()
        }
    }

    @objc func unlaunch(_ call: CAPPluginCall) {
        onMainThread {
            Notificare.shared.unlaunch()
            call.resolve()
        }
    }

    @objc func getApplication(_ call: CAPPluginCall) {
        do {
            var response: PluginCallResultData = [:]
            if let application = Notificare.shared.application {
                response["result"] = try application.toJson()
            }

            call.resolve(response)
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func fetchApplication(_ call: CAPPluginCall) {
        Notificare.shared.fetchApplication { result in
            switch result {
            case let .success(application):
                do {
                    call.resolve([
                        "result": try application.toJson()
                    ])
                } catch {
                    call.reject(error.localizedDescription)
                }
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func fetchNotification(_ call: CAPPluginCall) {
        guard let id = call.getString("id") else {
            call.reject("Missing 'id' parameter.")
            return
        }

        Notificare.shared.fetchNotification(id) { result in
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

    @objc func fetchDynamicLink(_ call: CAPPluginCall) {
        guard let url = call.getString("url") else {
            call.reject("Missing 'url' parameter.")
            return
        }

        Notificare.shared.fetchDynamicLink(url) { result in
            switch result {
            case let .success(dynamicLink):
                do {
                    call.resolve([
                        "result": try dynamicLink.toJson()
                    ])
                } catch {
                    call.reject(error.localizedDescription)
                }
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    // MARK: - Notificare device module

    @objc func getCurrentDevice(_ call: CAPPluginCall) {
        do {
            var response: PluginCallResultData = [:]
            if let device = Notificare.shared.device().currentDevice {
                response["result"] = try device.toJson()
            }

            call.resolve(response)
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func getPreferredLanguage(_ call: CAPPluginCall) {
        var response: PluginCallResultData = [:]
        if let language = Notificare.shared.device().preferredLanguage {
            response["result"] = language
        }

        call.resolve(response)
    }

    @objc func updatePreferredLanguage(_ call: CAPPluginCall) {
        let language = call.getString("language")

        Notificare.shared.device().updatePreferredLanguage(language) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func register(_ call: CAPPluginCall) {
        let userId = call.getString("userId")
        let userName = call.getString("userName")

        onMainThread {
            Notificare.shared.device().register(userId: userId, userName: userName) { result in
                switch result {
                case .success:
                    call.resolve()
                case let .failure(error):
                    call.reject(error.localizedDescription)
                }
            }
        }
    }

    @objc func fetchTags(_ call: CAPPluginCall) {
        Notificare.shared.device().fetchTags { result in
            switch result {
            case let .success(tags):
                call.resolve([
                    "result": tags
                ])
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func addTag(_ call: CAPPluginCall) {
        guard let tag = call.getString("tag") else {
            call.reject("Missing 'tag' parameter.")
            return
        }

        Notificare.shared.device().addTag(tag) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func addTags(_ call: CAPPluginCall) {
        guard let tags = call.getArray("tags", String.self) else {
            call.reject("Missing 'tags' parameter.")
            return
        }

        Notificare.shared.device().addTags(tags) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func removeTag(_ call: CAPPluginCall) {
        guard let tag = call.getString("tag") else {
            call.reject("Missing 'tag' parameter.")
            return
        }

        Notificare.shared.device().removeTag(tag) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func removeTags(_ call: CAPPluginCall) {
        guard let tags = call.getArray("tags", String.self) else {
            call.reject("Missing 'tags' parameter.")
            return
        }

        Notificare.shared.device().removeTags(tags) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func clearTags(_ call: CAPPluginCall) {
        Notificare.shared.device().clearTags { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func fetchDoNotDisturb(_ call: CAPPluginCall) {
        Notificare.shared.device().fetchDoNotDisturb { result in
            switch result {
            case let .success(dnd):
                do {
                    var response: PluginCallResultData = [:]
                    if let dnd = dnd {
                        response["result"] = try dnd.toJson()
                    }

                    call.resolve(response)
                } catch {
                    call.reject(error.localizedDescription)
                }
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func updateDoNotDisturb(_ call: CAPPluginCall) {
        guard let json = call.getObject("dnd") else {
            call.reject("Missing 'dnd' parameter.")
            return
        }

        let dnd: NotificareDoNotDisturb
        do {
            dnd = try NotificareDoNotDisturb.fromJson(json: json)
        } catch {
            call.reject(error.localizedDescription)
            return
        }

        Notificare.shared.device().updateDoNotDisturb(dnd) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func clearDoNotDisturb(_ call: CAPPluginCall) {
        Notificare.shared.device().clearDoNotDisturb { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func fetchUserData(_ call: CAPPluginCall) {
        Notificare.shared.device().fetchUserData { result in
            switch result {
            case let .success(userData):
                call.resolve([
                    "result": userData
                ])
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func updateUserData(_ call: CAPPluginCall) {
        guard let json = call.getObject("userData") else {
            call.reject("Missing 'userData' parameter.")
            return
        }

        let userData = json.compactMapValues { $0 as? String }

        Notificare.shared.device().updateUserData(userData) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }

    // MARK: - Notificare events module

    @objc func logCustom(_ call: CAPPluginCall) {
        guard let event = call.getString("event") else {
            call.reject("Missing 'event' parameter.")
            return
        }

        let data = call.getObject("data")

        Notificare.shared.events().logCustom(event, data: data) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
}

extension NotificarePlugin: NotificareDelegate {
    public func notificare(_ notificare: Notificare, onReady application: NotificareApplication) {
        do {
            EventBroker.instance.dispatchEvent("ready", data: try application.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the ready event.", error: error)
        }
    }

    public func notificareDidUnlaunch(_ notificare: Notificare) {
        EventBroker.instance.dispatchEvent("unlaunched", data: nil)
    }

    public func notificare(_ notificare: Notificare, didRegisterDevice device: NotificareDevice) {
        do {
            EventBroker.instance.dispatchEvent("device_registered", data: try device.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the device_registered event.", error: error)
        }
    }
}

private func onMainThread(_ action: @escaping () -> Void) {
    DispatchQueue.main.async {
        action()
    }
}
