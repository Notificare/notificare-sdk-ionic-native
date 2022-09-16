#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NotificareInAppMessagingPlugin, "NotificareInAppMessagingPlugin",
           CAP_PLUGIN_METHOD(hasMessagesSuppressed, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setMessagesSuppressed, CAPPluginReturnPromise);
)
