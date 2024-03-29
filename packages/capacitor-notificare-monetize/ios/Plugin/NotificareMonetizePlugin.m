#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NotificareMonetizePlugin, "NotificareMonetizePlugin",
           CAP_PLUGIN_METHOD(getProducts, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getPurchases, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(refresh, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(startPurchaseFlow, CAPPluginReturnPromise);
)
