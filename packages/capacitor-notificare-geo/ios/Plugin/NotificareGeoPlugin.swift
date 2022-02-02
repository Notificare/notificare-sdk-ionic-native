import Foundation
import Capacitor
import NotificareKit
import NotificareGeoKit

@objc(NotificareGeoPlugin)
public class NotificareGeoPlugin: CAPPlugin {
    public override func load() {
        EventBroker.instance.setup { self.notifyListeners($0, data: $1) }
        Notificare.shared.geo().delegate = self
    }
    
    @objc func hasLocationServicesEnabled(_ call: CAPPluginCall) {
        call.resolve([
            "result": Notificare.shared.geo().hasLocationServicesEnabled
        ])
    }
    
    @objc func hasBluetoothEnabled(_ call: CAPPluginCall) {
        call.resolve([
            "result": Notificare.shared.geo().hasBluetoothEnabled
        ])
    }
    
    @objc func enableLocationUpdates(_ call: CAPPluginCall) {
        Notificare.shared.geo().enableLocationUpdates()
        call.resolve()
    }
    
    @objc func disableLocationUpdates(_ call: CAPPluginCall) {
        Notificare.shared.geo().disableLocationUpdates()
        call.resolve()
    }
}

extension NotificareGeoPlugin: NotificareGeoDelegate {
    public func notificare(_ notificareGeo: NotificareGeo, didUpdateLocations locations: [NotificareLocation]) {
        guard let location = locations.first else { return }
        
        do {
            EventBroker.instance.dispatchEvent("location_updated", data: try location.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the location_updated event.", error: error)
        }
    }
    
    public func notificare(_ notificareGeo: NotificareGeo, didEnter region: NotificareRegion) {
        do {
            EventBroker.instance.dispatchEvent("region_entered", data: try region.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the region_entered event.", error: error)
        }
    }
    
    public func notificare(_ notificareGeo: NotificareGeo, didExit region: NotificareRegion) {
        do {
            EventBroker.instance.dispatchEvent("region_exited", data: try region.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the region_exited event.", error: error)
        }
    }
    
    public func notificare(_ notificareGeo: NotificareGeo, didEnter beacon: NotificareBeacon) {
        do {
            EventBroker.instance.dispatchEvent("beacon_entered", data: try beacon.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the beacon_entered event.", error: error)
        }
    }
    
    public func notificare(_ notificareGeo: NotificareGeo, didExit beacon: NotificareBeacon) {
        do {
            EventBroker.instance.dispatchEvent("beacon_exited", data: try beacon.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the beacon_exited event.", error: error)
        }
    }
    
    public func notificare(_ notificareGeo: NotificareGeo, didRange beacons: [NotificareBeacon], in region: NotificareRegion) {
        do {
            let data: [String: Any] = [
                "region": try region.toJson(),
                "beacons": try beacons.map { try $0.toJson() },
            ]
            
            EventBroker.instance.dispatchEvent("beacons_ranged", data: data)
        } catch {
            NotificareLogger.error("Failed to emit the beacons_ranged event.", error: error)
        }
    }
    
    public func notificare(_ notificareGeo: NotificareGeo, didVisit visit: NotificareVisit) {
        do {
            EventBroker.instance.dispatchEvent("visit", data: try visit.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the visit event.", error: error)
        }
    }
    
    public func notificare(_ notificareGeo: NotificareGeo, didUpdateHeading heading: NotificareHeading) {
        do {
            EventBroker.instance.dispatchEvent("heading_updated", data: try heading.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the heading_updated event.", error: error)
        }
    }
}
