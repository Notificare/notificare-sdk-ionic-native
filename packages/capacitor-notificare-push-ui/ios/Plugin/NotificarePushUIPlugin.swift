import Foundation
import Capacitor

@objc(NotificarePushUIPlugin)
public class NotificarePushUIPlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": value
        ])
    }
}
