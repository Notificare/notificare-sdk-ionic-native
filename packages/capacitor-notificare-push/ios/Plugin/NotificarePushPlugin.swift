import Foundation
import Capacitor

@objc(NotificarePushPlugin)
public class NotificarePushPlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": value
        ])
    }
}
