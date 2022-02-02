import Foundation
import Capacitor
import NotificareKit
import NotificareAssetsKit

@objc(NotificareAssetsPlugin)
public class NotificareAssetsPlugin: CAPPlugin {
    @objc func fetch(_ call: CAPPluginCall) {
        guard let group = call.getString("group") else {
            call.reject("Missing 'group' parameter.")
            return
        }
        
        Notificare.shared.assets().fetch(group: group) { result in
            switch result {
            case let .success(assets):
                do {
                    call.resolve([
                        "result": try assets.map { try $0.toJson() }
                    ])
                } catch {
                    call.reject(error.localizedDescription)
                }
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
}
