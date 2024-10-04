import Foundation
import Capacitor
import NotificareKit
import NotificareScannablesKit

@objc(NotificareScannablesPlugin)
public class NotificareScannablesPlugin: CAPPlugin {
    private var rootViewController: UIViewController? {
        get {
            UIApplication.shared.delegate?.window??.rootViewController
        }
    }
    
    public override func load() {
        addApplicationLaunchListener()

        EventBroker.instance.setup { self.notifyListeners($0, data: $1) }
        Notificare.shared.scannables().delegate = self
    }
    
    @objc func canStartNfcScannableSession(_ call: CAPPluginCall) {
        call.resolve([
            "result": Notificare.shared.scannables().canStartNfcScannableSession
        ])
    }
    
    @objc func startScannableSession(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard let rootViewController = self.rootViewController else {
                call.reject("Cannot start a scannable session with a nil root view controller.")
                return
            }
            
            Notificare.shared.scannables().startScannableSession(controller: rootViewController)
            call.resolve()
        }
    }
    
    @objc func startNfcScannableSession(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            Notificare.shared.scannables().startNfcScannableSession()
            call.resolve()
        }
    }
    
    @objc func startQrCodeScannableSession(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard let rootViewController = self.rootViewController else {
                call.reject("Cannot start a scannable session with a nil root view controller.")
                return
            }
            
            Notificare.shared.scannables().startQrCodeScannableSession(controller: rootViewController, modal: true)
            call.resolve()
        }
    }
    
    @objc func fetch(_ call: CAPPluginCall) {
        guard let tag = call.getString("tag") else {
            call.reject("Missing 'tag' parameter.")
            return
        }
        
        Notificare.shared.scannables().fetch(tag: tag) { result in
            switch result {
            case let .success(scannable):
                do {
                    call.resolve([
                        "result": try scannable.toJson()
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

extension NotificareScannablesPlugin: NotificareScannablesDelegate {
    public func notificare(_ notificareScannables: NotificareScannables, didDetectScannable scannable: NotificareScannable) {
        do {
            EventBroker.instance.dispatchEvent("scannable_detected", data: try scannable.toJson())
        } catch {
            logger.error("Failed to emit the scannable_detected event.", error: error)
        }
    }
    
    public func notificare(_ notificareScannables: NotificareScannables, didInvalidateScannerSession error: Error) {
        EventBroker.instance.dispatchEvent("scannable_session_failed", data: [
            "error": error.localizedDescription
        ])
    }
}

extension NotificareScannablesPlugin {
    private func addApplicationLaunchListener() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(didFinishLaunching),
            name: UIApplication.didFinishLaunchingNotification,
            object: nil
        )
    }

    private func removeApplicationLaunchListener() {
        NotificationCenter.default.removeObserver(
            self,
            name: UIApplication.didFinishLaunchingNotification,
            object: nil
        )
    }

    @objc private func didFinishLaunching() {
        removeApplicationLaunchListener()

        logger.hasDebugLoggingEnabled = Notificare.shared.options?.debugLoggingEnabled ?? false
    }
}
