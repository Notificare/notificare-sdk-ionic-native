import Foundation
import Capacitor
import NotificareKit
import NotificareMonetizeKit

@objc(NotificareMonetizePlugin)
public class NotificareMonetizePlugin: CAPPlugin {
    public override func load() {
        EventBroker.instance.setup { self.notifyListeners($0, data: $1) }
        Notificare.shared.monetize().delegate = self
    }
    
    @objc func getProducts(_ call: CAPPluginCall) {
        do {
            call.resolve([
                "result": try Notificare.shared.monetize().products.map { try $0.toJson() }
            ])
        } catch {
            call.reject(error.localizedDescription)
        }
    }
    
    @objc func getPurchases(_ call: CAPPluginCall) {
        do {
            call.resolve([
                "result": try Notificare.shared.monetize().purchases.map { try $0.toJson() }
            ])
        } catch {
            call.reject(error.localizedDescription)
        }
    }
    
    @objc func refresh(_ call: CAPPluginCall) {
        Notificare.shared.monetize().refresh { result in
            switch result {
            case .success:
                call.resolve()
            case let .failure(error):
                call.reject(error.localizedDescription)
            }
        }
    }
    
    @objc func startPurchaseFlow(_ call: CAPPluginCall) {
        guard let json = call.getObject("product") else {
            call.reject("Missing 'product' parameter.")
            return
        }
        
        let product: NotificareProduct
        
        do {
            product = try NotificareProduct.fromJson(json: json)
        } catch {
            call.reject(error.localizedDescription)
            return
        }
        
        Notificare.shared.monetize().startPurchaseFlow(for: product)
        call.resolve()
    }
}

extension NotificareMonetizePlugin: NotificareMonetizeDelegate {
    public func notificare(_ notificareMonetize: NotificareMonetize, didUpdateProducts products: [NotificareProduct]) {
        do {
            let data = [
                "products": try products.map { try $0.toJson() }
            ]
            
            EventBroker.instance.dispatchEvent("products_updated", data: data)
        } catch {
            NotificareLogger.error("Failed to emit the products_updated event.", error: error)
        }
    }
    
    public func notificare(_ notificareMonetize: NotificareMonetize, didUpdatePurchases purchases: [NotificarePurchase]) {
        do {
            let data = [
                "purchases": try purchases.map { try $0.toJson() }
            ]
            
            EventBroker.instance.dispatchEvent("purchases_updated", data: data)
        } catch {
            NotificareLogger.error("Failed to emit the purchases_updated event.", error: error)
        }
    }
    
    public func notificare(_ notificareMonetize: NotificareMonetize, didFinishPurchase purchase: NotificarePurchase) {
        do {
            EventBroker.instance.dispatchEvent("purchase_finished", data: try purchase.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the purchase_finished event.", error: error)
        }
    }
    
    public func notificare(_ notificareMonetize: NotificareMonetize, didRestorePurchase purchase: NotificarePurchase) {
        do {
            EventBroker.instance.dispatchEvent("purchase_restored", data: try purchase.toJson())
        } catch {
            NotificareLogger.error("Failed to emit the purchase_restored event.", error: error)
        }
    }
    
    public func notificareDidCancelPurchase(_ notificareMonetize: NotificareMonetize) {
        EventBroker.instance.dispatchEvent("purchase_canceled", data: nil)
    }
    
    public func notificare(_ notificareMonetize: NotificareMonetize, didFailToPurchase error: Error) {
        EventBroker.instance.dispatchEvent("purchase_failed", data: ["errorMessage": error.localizedDescription])
    }
}
