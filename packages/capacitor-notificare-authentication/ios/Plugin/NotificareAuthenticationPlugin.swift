import Foundation
import Capacitor
import NotificareKit
import NotificareAuthenticationKit

@objc(NotificareAuthenticationPlugin)
public class NotificareAuthenticationPlugin: CAPPlugin {
    
    public override func load() {
        EventBroker.instance.setup { self.notifyListeners($0, data: $1) }
        
        NotificationCenter.default.addObserver(self, selector: #selector(self.handleUniversalLink(notification:)), name: .capacitorOpenUniversalLink, object: nil)
    }
    
    deinit {
        NotificationCenter.default.removeObserver(self, name: .capacitorOpenUniversalLink, object: nil)
    }
    
    @objc func handleUniversalLink(notification: NSNotification) {
        guard let object = notification.object as? [String: Any?], let url = object["url"] as? URL else {
            NotificareLogger.warning("Unprocessable universal_link event.")
            return
        }
        
        if let token = Notificare.shared.authentication().parsePasswordResetToken(url) {
            EventBroker.instance.dispatchEvent("password_reset_token_received", data: [
                "token": token
            ])
            return
        }
        
        if let token = Notificare.shared.authentication().parseValidateUserToken(url) {
            EventBroker.instance.dispatchEvent("validate_user_token_received", data: [
                "token": token
            ])
            return
        }
    }
    
    // MARK: - Notificare Authentication
    
    @objc func isLoggedIn(_ call: CAPPluginCall) {
        call.resolve([
            "result": Notificare.shared.authentication().isLoggedIn
        ])
    }
    
    @objc func login(_ call: CAPPluginCall) {
        guard let email = call.getString("email") else {
            call.reject("Missing 'email' parameter.")
            return
        }
        
        guard let password = call.getString("password") else {
            call.reject("Missing 'password' parameter.")
            return
        }
        
        Notificare.shared.authentication().login(email: email, password: password) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func logout(_ call: CAPPluginCall) {
        Notificare.shared.authentication().logout { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func fetchUserDetails(_ call: CAPPluginCall) {
        Notificare.shared.authentication().fetchUserDetails { result in
            switch result {
            case let .success(user):
                do {
                    call.resolve([
                        "result": try user.toJson()
                    ])
                } catch {
                    call.reject(error.localizedDescription)
                }
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func changePassword(_ call: CAPPluginCall) {
        guard let password = call.getString("password") else {
            call.reject("Missing 'password' parameter.")
            return
        }
        
        Notificare.shared.authentication().changePassword(password) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func generatePushEmailAddress(_ call: CAPPluginCall) {
        Notificare.shared.authentication().generatePushEmailAddress { result in
            switch result {
            case let .success(user):
                do {
                    call.resolve([
                        "result": try user.toJson()
                    ])
                } catch {
                    call.reject(error.localizedDescription)
                }
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func createAccount(_ call: CAPPluginCall) {
        guard let email = call.getString("email") else {
            call.reject("Missing 'email' parameter.")
            return
        }
        
        guard let password = call.getString("password") else {
            call.reject("Missing 'password' parameter.")
            return
        }
        
        let name = call.getString("name")
        
        Notificare.shared.authentication().createAccount(email: email, password: password, name: name) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func validateUser(_ call: CAPPluginCall) {
        guard let token = call.getString("token") else {
            call.reject("Missing 'token' parameter.")
            return
        }
        
        Notificare.shared.authentication().validateUser(token: token) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func sendPasswordReset(_ call: CAPPluginCall) {
        guard let email = call.getString("email") else {
            call.reject("Missing 'email' parameter.")
            return
        }
        
        Notificare.shared.authentication().sendPasswordReset(email: email) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func resetPassword(_ call: CAPPluginCall) {
        guard let password = call.getString("password") else {
            call.reject("Missing 'password' parameter.")
            return
        }
        
        guard let token = call.getString("token") else {
            call.reject("Missing 'token' parameter.")
            return
        }
        
        Notificare.shared.authentication().resetPassword(password, token: token) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func fetchUserPreferences(_ call: CAPPluginCall) {
        Notificare.shared.authentication().fetchUserPreferences { result in
            switch result {
            case let .success(preferences):
                do {
                    call.resolve([
                        "result": try preferences.map { try $0.toJson() }
                    ])
                } catch {
                    call.reject(error.localizedDescription)
                }
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func fetchUserSegments(_ call: CAPPluginCall) {
        Notificare.shared.authentication().fetchUserSegments { result in
            switch result {
            case let .success(segments):
                do {
                    call.resolve([
                        "result": try segments.map { try $0.toJson() }
                    ])
                } catch {
                    call.reject(error.localizedDescription)
                }
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func addUserSegment(_ call: CAPPluginCall) {
        guard let json = call.getObject("segment") else {
            call.reject("Missing 'segment' parameter.")
            return
        }
        
        let segment: NotificareUserSegment
        
        do {
            segment = try NotificareUserSegment.fromJson(json: json)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        Notificare.shared.authentication().addUserSegment(segment) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func removeUserSegment(_ call: CAPPluginCall) {
        guard let json = call.getObject("segment") else {
            call.reject("Missing 'segment' parameter.")
            return
        }
        
        let segment: NotificareUserSegment
        
        do {
            segment = try NotificareUserSegment.fromJson(json: json)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        Notificare.shared.authentication().removeUserSegment(segment) { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func addUserSegmentToPreference(_ call: CAPPluginCall) {
        guard let preferenceJson = call.getObject("preference") else {
            call.reject("Missing 'preference' parameter.")
            return
        }
        
        guard let segmentJson = call.getObject("segment") else {
            call.reject("Missing 'segment' paramenter.")
            return
        }
        
        let preference: NotificareUserPreference
        
        do {
            preference = try NotificareUserPreference.fromJson(json: preferenceJson)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        do {
            let segment = try NotificareUserSegment.fromJson(json: segmentJson)
            Notificare.shared.authentication().addUserSegmentToPreference(segment, to: preference) { result in
                switch result {
                case .success:
                    call.resolve()
                case let .failure(error):
                    call.reject(error.localizedDescription)
                }
            }
            
            return
        } catch {
            NotificareLogger.debug("Failed to parse segment data into NotificareUserSegment.", error: error)
        }
        
        do {
            let option = try NotificareUserPreference.Option.fromJson(json: segmentJson)
            Notificare.shared.authentication().addUserSegmentToPreference(option: option, to: preference) { result in
                switch result {
                case .success:
                    call.resolve()
                case let .failure(error):
                    call.reject(error.localizedDescription)
                }
            }
            
            return
        } catch {
            NotificareLogger.debug("Failed to parse segment data into NotificareUserPreference.Option.", error: error)
        }
        
        call.reject("To execute this method, you must provide either a NotificareUserSegment or a NotificarePreferenceOption.")
    }
    
    @objc func removeUserSegmentFromPreference(_ call: CAPPluginCall) {
        guard let preferenceJson = call.getObject("preference") else {
            call.reject("Missing 'preference' parameter.")
            return
        }
        
        guard let segmentJson = call.getObject("segment") else {
            call.reject("Missing 'segment' paramenter.")
            return
        }
        
        let preference: NotificareUserPreference
        
        do {
            preference = try NotificareUserPreference.fromJson(json: preferenceJson)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        do {
            let segment = try NotificareUserSegment.fromJson(json: segmentJson)
            Notificare.shared.authentication().removeUserSegmentFromPreference(segment, from: preference) { result in
                switch result {
                case .success:
                    call.resolve()
                case let .failure(error):
                    call.reject(error.localizedDescription)
                }
            }
            
            return
        } catch {
            NotificareLogger.debug("Failed to parse segment data into NotificareUserSegment.", error: error)
        }
        
        do {
            let option = try NotificareUserPreference.Option.fromJson(json: segmentJson)
            Notificare.shared.authentication().removeUserSegmentFromPreference(option: option, from: preference) { result in
                switch result {
                case .success:
                    call.resolve()
                case let .failure(error):
                    call.reject(error.localizedDescription)
                }
            }
            
            return
        } catch {
            NotificareLogger.debug("Failed to parse segment data into NotificareUserPreference.Option.", error: error)
        }
        
        call.reject("To execute this method, you must provide either a NotificareUserSegment or a NotificarePreferenceOption.")
    }
}
