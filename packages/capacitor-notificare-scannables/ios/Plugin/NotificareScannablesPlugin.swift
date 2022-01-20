import Foundation
import Capacitor

@objc(NotificareScannablesPlugin)
public class NotificareScannablesPlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": value
        ])
    }
}
