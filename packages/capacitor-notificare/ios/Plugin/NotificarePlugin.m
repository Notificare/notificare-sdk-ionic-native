#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NotificarePlugin, "NotificarePlugin",
           CAP_PLUGIN_METHOD(isConfigured, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(isReady, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(launch, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(unlaunch, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getApplication, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(fetchApplication, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(fetchNotification, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(fetchDynamicLink, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(canEvaluateDeferredLink, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(evaluateDeferredLink, CAPPluginReturnPromise);
           // Device module
           CAP_PLUGIN_METHOD(getCurrentDevice, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(getPreferredLanguage, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updatePreferredLanguage, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(register, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateUser, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(fetchTags, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addTag, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addTags, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeTag, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeTags, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(clearTags, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(fetchDoNotDisturb, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateDoNotDisturb, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(clearDoNotDisturb, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(fetchUserData, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(updateUserData, CAPPluginReturnPromise);
           // Events module
           CAP_PLUGIN_METHOD(logCustom, CAPPluginReturnPromise);
)
