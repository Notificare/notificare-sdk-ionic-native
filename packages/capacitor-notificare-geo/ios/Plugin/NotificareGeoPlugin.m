#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NotificareGeoPlugin, "NotificareGeoPlugin",
           CAP_PLUGIN_METHOD(hasLocationServicesEnabled, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(hasBluetoothEnabled, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getMonitoredRegions, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getEnteredRegions, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(enableLocationUpdates, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(disableLocationUpdates, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(checkPermissionStatus, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(shouldShowPermissionRationale, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(presentPermissionRationale, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(requestPermission, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(openAppSettings, CAPPluginReturnPromise);
)
