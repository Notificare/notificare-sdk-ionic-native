#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NotificareInboxPlugin, "NotificareInboxPlugin",
           CAP_PLUGIN_METHOD(getItems, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getBadge, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(refresh, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(open, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(markAsRead, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(markAllAsRead, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(remove, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(clear, CAPPluginReturnPromise);
)
