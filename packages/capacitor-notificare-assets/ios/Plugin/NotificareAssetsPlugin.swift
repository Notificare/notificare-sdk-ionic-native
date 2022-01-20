import Foundation
import Capacitor

@objc(NotificareAssetsPlugin)
public class NotificareAssetsPlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": value
        ])
    }
}
