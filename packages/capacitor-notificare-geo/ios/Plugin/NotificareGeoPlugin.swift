import Foundation
import Capacitor
import CoreLocation
import NotificareKit
import NotificareGeoKit

private let REQUESTED_LOCATION_ALWAYS_KEY = "re.notifica.geo.capacitor.requested_location_always"

@objc(NotificareGeoPlugin)
public class NotificareGeoPlugin: CAPPlugin {
    private let locationManager = CLLocationManager()
    private var requestedPermission: PermissionGroup?
    private var requestedPermissionCall: CAPPluginCall?
    
    private var authorizationStatus: CLAuthorizationStatus {
        if #available(iOS 14.0, *) {
            return locationManager.authorizationStatus
        }
        
        return CLLocationManager.authorizationStatus()
    }
    
    public override func load() {
        EventBroker.instance.setup { self.notifyListeners($0, data: $1) }
        Notificare.shared.geo().delegate = self
        
        locationManager.delegate = self
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
    
    @objc func checkPermissionStatus(_ call: CAPPluginCall) {
        guard let permissionStr = call.getString("permission"), let permission = PermissionGroup(rawValue: permissionStr) else {
            call.reject("Missing 'permission' parameter.")
            return
        }
        
        let status = checkPermissionStatus(permission)
        call.resolve(["result": status.rawValue])
    }
    
    @objc func shouldShowPermissionRationale(_ call: CAPPluginCall) {
        call.resolve(["result": false])
    }
    
    @objc func presentPermissionRationale(_ call: CAPPluginCall) {
        call.reject("This method is not implemented in iOS.")
    }
    
    @objc func requestPermission(_ call: CAPPluginCall) {
        guard let permissionStr = call.getString("permission"), let permission = PermissionGroup(rawValue: permissionStr) else {
            call.reject("Missing 'permission' parameter.")
            return
        }
        
        guard permission != .bluetoothScan else {
            call.resolve(["result": PermissionStatus.granted.rawValue])
            return
        }
        
        let status = checkPermissionStatus(permission)
        
        if permission == .locationAlways && authorizationStatus == .authorizedWhenInUse {
            if UserDefaults.standard.bool(forKey: REQUESTED_LOCATION_ALWAYS_KEY) {
                call.resolve(["result": status.rawValue])
                return
            }
        }
        
        requestedPermission = permission
        requestedPermissionCall = call
        
        if permission == .locationWhenInUse {
            locationManager.requestWhenInUseAuthorization()
        } else if permission == .locationAlways {
            locationManager.requestAlwaysAuthorization()
            UserDefaults.standard.set(true, forKey: REQUESTED_LOCATION_ALWAYS_KEY)
        }
    }
    
    @objc func openAppSettings(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard let url = URL(string: UIApplication.openSettingsURLString), UIApplication.shared.canOpenURL(url) else {
                call.reject("Unable to open the application settings.")
                return
            }
            
            UIApplication.shared.open(url) { success in
                if success {
                    call.resolve()
                } else {
                    call.reject("Unable to open the application settings.")
                }
            }
        }
    }
    
    private func checkPermissionStatus(_ permission: PermissionGroup) -> PermissionStatus {
        guard permission != .bluetoothScan else {
            return .granted
        }
        
        return determinePermissionStatus(permission, authorizationStatus: authorizationStatus)
    }
    
    private func determinePermissionStatus(_ permission: PermissionGroup, authorizationStatus: CLAuthorizationStatus) -> PermissionStatus {
        if permission == .locationAlways {
            switch authorizationStatus {
            case .notDetermined:
                return .denied
            case .restricted:
                return .restricted
            case .denied:
                return .permanentlyDenied
            case .authorizedWhenInUse:
                return UserDefaults.standard.bool(forKey: REQUESTED_LOCATION_ALWAYS_KEY) ? .permanentlyDenied : .denied
            case .authorizedAlways:
                return .granted
            }
        }
        
        switch authorizationStatus {
        case .notDetermined:
            return .denied
        case .restricted:
            return .restricted
        case .denied:
            return .permanentlyDenied
        case .authorizedWhenInUse, .authorizedAlways:
            return .granted
        }
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

extension NotificareGeoPlugin: CLLocationManagerDelegate {
    public func locationManager(_ manager: CLLocationManager, didChangeAuthorization status: CLAuthorizationStatus) {
        handleAuthorizationChange(status)
    }
    
    @available(iOS 14.0, *)
    public func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        handleAuthorizationChange(manager.authorizationStatus)
    }
    
    private func handleAuthorizationChange(_ authorizationStatus: CLAuthorizationStatus) {
        if authorizationStatus == .notDetermined {
            // When the user changes to "Ask Next Time" via the Settings app.
            UserDefaults.standard.removeObject(forKey: REQUESTED_LOCATION_ALWAYS_KEY)
        }
        
        guard let requestedPermission = requestedPermission, let requestedPermissionCall = requestedPermissionCall else {
            return
        }
        
        let status = determinePermissionStatus(requestedPermission, authorizationStatus: authorizationStatus)
        requestedPermissionCall.resolve(["result": status.rawValue])
        
        self.requestedPermission = nil
        self.requestedPermissionCall = nil
    }
}

extension NotificareGeoPlugin {
    internal enum PermissionGroup: String, CaseIterable {
        case locationWhenInUse = "location_when_in_use"
        case locationAlways = "location_always"
        case bluetoothScan = "bluetooth_scan"
    }
    
    internal enum PermissionStatus: String, CaseIterable {
        case denied = "denied"
        case granted = "granted"
        case restricted = "restricted"
        case permanentlyDenied = "permanently_denied"
    }
}
