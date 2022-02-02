#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NotificareScannablesPlugin, "NotificareScannablesPlugin",
           CAP_PLUGIN_METHOD(canStartNfcScannableSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(startScannableSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(startNfcScannableSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(startQrCodeScannableSession, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(fetch, CAPPluginReturnPromise);
)
