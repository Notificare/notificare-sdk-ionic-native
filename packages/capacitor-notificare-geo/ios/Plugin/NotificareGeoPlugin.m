#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NotificareGeoPlugin, "NotificareGeoPlugin",
           CAP_PLUGIN_METHOD(hasLocationServicesEnabled, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(hasBluetoothEnabled, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(enableLocationUpdates, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(disableLocationUpdates, CAPPluginReturnPromise);
)
