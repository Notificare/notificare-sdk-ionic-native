#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(NotificareAuthenticationPlugin, "NotificareAuthenticationPlugin",
           CAP_PLUGIN_METHOD(isLoggedIn, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(login, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(logout, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(fetchUserDetails, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(changePassword, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(generatePushEmailAddress, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(createAccount, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(validateUser, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(sendPasswordReset, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(resetPassword, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(fetchUserPreferences, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(fetchUserSegments, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addUserSegment, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeUserSegment, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(addUserSegmentToPreference, CAPPluginReturnPromise);
           CAP_PLUGIN_METHOD(removeUserSegmentFromPreference, CAPPluginReturnPromise);
)
