#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NotificareUserInboxPlugin, "NotificareUserInboxPlugin",
           CAP_PLUGIN_METHOD(parseResponseFromJson, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(parseResponseFromString, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(open, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(markAsRead, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(remove, CAPPluginReturnPromise);
)
