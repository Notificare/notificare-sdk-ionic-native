#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NotificarePushUIPlugin, "NotificarePushUIPlugin",
           CAP_PLUGIN_METHOD(presentNotification, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(presentAction, CAPPluginReturnPromise);
)
