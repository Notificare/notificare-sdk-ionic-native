package re.notifica.monetize.capacitor

import android.os.Handler
import android.os.Looper
import androidx.lifecycle.Observer
import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.NotificareCallback
import re.notifica.internal.NotificareLogger
import re.notifica.monetize.NotificareMonetize
import re.notifica.monetize.ktx.monetize
import re.notifica.monetize.models.NotificareProduct
import re.notifica.monetize.models.NotificarePurchase

@CapacitorPlugin(name = "NotificareMonetizePlugin")
public class NotificareMonetizePlugin : Plugin(), NotificareMonetize.Listener {
    private val productsObserver = Observer<List<NotificareProduct>> { products ->
        if (products == null) return@Observer

        try {
            val data = JSObject()
            data.put("products", JSArray(products.map { it.toJson() }))

            EventBroker.dispatchEvent("products_updated", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the products_updated event.", e)
        }
    }

    private val purchasesObserver = Observer<List<NotificarePurchase>> { purchases ->
        if (purchases == null) return@Observer

        try {
            val data = JSObject()
            data.put("purchases", JSArray(purchases.map { it.toJson() }))

            EventBroker.dispatchEvent("purchases_updated", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the purchases_updated event.", e)
        }
    }

    override fun load() {
        EventBroker.setup(this::notifyListeners)

        onMainThread {
            Notificare.monetize().observableProducts.observeForever(productsObserver)
            Notificare.monetize().observablePurchases.observeForever(purchasesObserver)
        }

        Notificare.monetize().removeListener(this)
        Notificare.monetize().addListener(this)
    }

    // region Notificare Monetize

    @PluginMethod
    public fun getProducts(call: PluginCall) {
        try {
            call.resolve(
                JSObject().apply {
                    put("result", JSArray(Notificare.monetize().products.map { it.toJson() }))
                }
            )
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
        }
    }

    @PluginMethod
    public fun getPurchases(call: PluginCall) {
        try {
            call.resolve(
                JSObject().apply {
                    put("result", JSArray(Notificare.monetize().purchases.map { it.toJson() }))
                }
            )
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
        }
    }

    @PluginMethod
    public fun refresh(call: PluginCall) {
        Notificare.monetize().refresh(object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun startPurchaseFlow(call: PluginCall) {
        val json = call.getObject("product") ?: run {
            call.reject("Missing 'product' parameter.")
            return
        }

        val product: NotificareProduct = try {
            NotificareProduct.fromJson(json)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        val activity = activity ?: run {
            call.reject("Cannot start a purchase without an activity.")
            return
        }

        Notificare.monetize().startPurchaseFlow(activity, product)
        call.resolve()
    }

    // region NotificareMonetize.Listener

    override fun onBillingSetupFinished() {
        try {
            EventBroker.dispatchEvent("billing_setup_finished", null)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the billing_setup_failed event.", e)
        }
    }

    override fun onBillingSetupFailed(code: Int, message: String) {
        try {
            val data = JSObject().apply {
                put("code", code)
                put("message", message)
            }

            EventBroker.dispatchEvent("billing_setup_failed", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the billing_setup_failed event.", e)
        }
    }

    override fun onPurchaseFinished(purchase: NotificarePurchase) {
        try {
            EventBroker.dispatchEvent("purchase_finished", purchase.toJson())
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the purchase_finished event.", e)
        }
    }

    override fun onPurchaseRestored(purchase: NotificarePurchase) {
        try {
            EventBroker.dispatchEvent("purchase_restored", purchase.toJson())
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the purchase_restored event.", e)
        }
    }

    override fun onPurchaseCanceled() {
        try {
            EventBroker.dispatchEvent("purchase_canceled", null)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the purchase_canceled event.", e)
        }
    }

    override fun onPurchaseFailed(code: Int, message: String) {
        try {
            val data = JSObject().apply {
                put("code", code)
                put("message", message)
            }

            EventBroker.dispatchEvent("purchase_failed", data)
        } catch (e: Exception) {
            NotificareLogger.error("Failed to emit the purchase_failed event.", e)
        }
    }

    // endregion

    // endregion

    public companion object {
        internal fun onMainThread(action: () -> Unit) = Handler(Looper.getMainLooper()).post(action)
    }
}
