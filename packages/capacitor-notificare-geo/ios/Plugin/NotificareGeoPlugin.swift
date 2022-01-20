import Foundation
import Capacitor

@objc(NotificareGeoPlugin)
public class NotificareGeoPlugin: CAPPlugin {
    @objc func echo(_ call: CAPPluginCall) {
        let value = call.getString("value") ?? ""
        call.resolve([
            "value": value
        ])
    }
}
