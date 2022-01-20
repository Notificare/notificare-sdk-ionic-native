import Foundation
import Capacitor

@objc(NotificareAuthenticationPlugin)
public class NotificareAuthenticationPlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": value
        ])
    }
}
