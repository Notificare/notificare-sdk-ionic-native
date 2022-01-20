import Foundation
import Capacitor

@objc(NotificareLoyaltyPlugin)
public class NotificareLoyaltyPlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": value
        ])
    }
}
