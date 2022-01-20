import Foundation
import Capacitor

@objc(NotificareInboxPlugin)
public class NotificareInboxPlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": value
        ])
    }
}
