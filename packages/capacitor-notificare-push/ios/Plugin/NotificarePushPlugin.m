#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NotificarePushPlugin, "NotificarePushPlugin",
           CAP_PLUGIN_METHOD(setAuthorizationOptions, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setCategoryOptions, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(setPresentationOptions, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(hasRemoteNotificationsEnabled, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getTransport, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getSubscription, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(allowedUI, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(enableRemoteNotifications, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(disableRemoteNotifications, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(checkPermissionStatus, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(shouldShowPermissionRationale, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(presentPermissionRationale, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(requestPermission, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(openAppSettings, CAPPluginReturnPromise);
)
