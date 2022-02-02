package re.notifica.authentication.capacitor

import android.content.Intent
import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin
import re.notifica.Notificare
import re.notifica.NotificareCallback
import re.notifica.authentication.ktx.authentication
import re.notifica.authentication.models.NotificareUser
import re.notifica.authentication.models.NotificareUserPreference
import re.notifica.authentication.models.NotificareUserSegment
import re.notifica.internal.NotificareLogger

@CapacitorPlugin(name = "NotificareAuthenticationPlugin")
public class NotificareAuthenticationPlugin : Plugin() {

    override fun load() {
        EventBroker.setup(this::notifyListeners)

        val intent = activity?.intent
        if (intent != null) handleOnNewIntent(intent)
    }

    override fun handleOnNewIntent(intent: Intent) {
        val passwordResetToken = Notificare.authentication().parsePasswordResetToken(intent)
        if (passwordResetToken != null) {
            EventBroker.dispatchEvent("password_reset_token_received", JSObject().apply {
                put("token", passwordResetToken)
            })
            return
        }

        val validateUserToken = Notificare.authentication().parseValidateUserToken(intent)
        if (validateUserToken != null) {
            EventBroker.dispatchEvent("validate_user_token_received", JSObject().apply {
                put("token", validateUserToken)
            })
            return
        }
    }

    @PluginMethod
    public fun isLoggedIn(call: PluginCall) {
        call.resolve(
            JSObject().apply {
                put("result", Notificare.authentication().isLoggedIn)
            }
        )
    }

    @PluginMethod
    public fun login(call: PluginCall) {
        val email = call.getString("email") ?: run {
            call.reject("Missing 'email' parameter.")
            return
        }

        val password = call.getString("password") ?: run {
            call.reject("Missing 'password' parameter.")
            return
        }

        Notificare.authentication().login(email, password, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun logout(call: PluginCall) {
        Notificare.authentication().logout(object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun fetchUserDetails(call: PluginCall) {
        Notificare.authentication().fetchUserDetails(object : NotificareCallback<NotificareUser> {
            override fun onSuccess(result: NotificareUser) {
                try {
                    call.resolve(
                        JSObject().apply {
                            put("result", result.toJson())
                        }
                    )
                } catch (e: Exception) {
                    call.reject(e.localizedMessage)
                }
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun changePassword(call: PluginCall) {
        val password = call.getString("password") ?: run {
            call.reject("Missing 'password' parameter.")
            return
        }

        Notificare.authentication().changePassword(password, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun generatePushEmailAddress(call: PluginCall) {
        Notificare.authentication().generatePushEmailAddress(object : NotificareCallback<NotificareUser> {
            override fun onSuccess(result: NotificareUser) {
                try {
                    call.resolve(
                        JSObject().apply {
                            put("result", result.toJson())
                        }
                    )
                } catch (e: Exception) {
                    call.reject(e.localizedMessage)
                }
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun createAccount(call: PluginCall) {
        val email = call.getString("email") ?: run {
            call.reject("Missing 'email' parameter.")
            return
        }

        val password = call.getString("password") ?: run {
            call.reject("Missing 'password' parameter.")
            return
        }

        val name = call.getString("name")

        Notificare.authentication().createAccount(email, password, name, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun validateUser(call: PluginCall) {
        val token = call.getString("token") ?: run {
            call.reject("Missing 'token' parameter.")
            return
        }

        Notificare.authentication().validateUser(token, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun sendPasswordReset(call: PluginCall) {
        val email = call.getString("email") ?: run {
            call.reject("Missing 'email' parameter.")
            return
        }

        Notificare.authentication().sendPasswordReset(email, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun resetPassword(call: PluginCall) {
        val password = call.getString("password") ?: run {
            call.reject("Missing 'password' parameter.")
            return
        }

        val token = call.getString("token") ?: run {
            call.reject("Missing 'token' parameter.")
            return
        }

        Notificare.authentication().resetPassword(password, token, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun fetchUserPreferences(call: PluginCall) {
        Notificare.authentication().fetchUserPreferences(object : NotificareCallback<List<NotificareUserPreference>> {
            override fun onSuccess(result: List<NotificareUserPreference>) {
                try {
                    call.resolve(
                        JSObject().apply {
                            put("result", JSArray(result.map { it.toJson() }))
                        }
                    )
                } catch (e: Exception) {
                    call.reject(e.localizedMessage)
                }
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun fetchUserSegments(call: PluginCall) {
        Notificare.authentication().fetchUserSegments(object : NotificareCallback<List<NotificareUserSegment>> {
            override fun onSuccess(result: List<NotificareUserSegment>) {
                try {
                    call.resolve(
                        JSObject().apply {
                            put("result", JSArray(result.map { it.toJson() }))
                        }
                    )
                } catch (e: Exception) {
                    call.reject(e.localizedMessage)
                }
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun addUserSegment(call: PluginCall) {
        val json = call.getObject("segment") ?: run {
            call.reject("Missing 'segment' parameter.")
            return
        }

        val segment: NotificareUserSegment = try {
            NotificareUserSegment.fromJson(json)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        Notificare.authentication().addUserSegment(segment, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })
    }

    @PluginMethod
    public fun removeUserSegment(call: PluginCall) {
        val json = call.getObject("segment") ?: run {
            call.reject("Missing 'segment' parameter.")
            return
        }

        val segment: NotificareUserSegment = try {
            NotificareUserSegment.fromJson(json)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        Notificare.authentication().removeUserSegment(segment, object : NotificareCallback<Unit> {
            override fun onSuccess(result: Unit) {
                call.resolve()
            }

            override fun onFailure(e: Exception) {
                call.reject(e.localizedMessage)
            }
        })

    }

    @PluginMethod
    public fun addUserSegmentToPreference(call: PluginCall) {
        val preferenceJson = call.getObject("preference") ?: run {
            call.reject("Missing 'preference' parameter.")
            return
        }

        val segmentJson = call.getObject("segment") ?: run {
            call.reject("Missing 'segment' parameter.")
            return
        }

        val preference: NotificareUserPreference = try {
            NotificareUserPreference.fromJson(preferenceJson)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        try {
            val segment = NotificareUserSegment.fromJson(segmentJson)
            Notificare.authentication()
                .addUserSegmentToPreference(segment, preference, object : NotificareCallback<Unit> {
                    override fun onSuccess(result: Unit) {
                        call.resolve()
                    }

                    override fun onFailure(e: Exception) {
                        call.reject(e.localizedMessage)
                    }
                })

            return
        } catch (e: Exception) {
            NotificareLogger.debug("Failed to parse segment data into a NotificareUserSegment.", e)
        }

        try {
            val option = NotificareUserPreference.Option.fromJson(segmentJson)
            Notificare.authentication()
                .addUserSegmentToPreference(option, preference, object : NotificareCallback<Unit> {
                    override fun onSuccess(result: Unit) {
                        call.resolve()
                    }

                    override fun onFailure(e: Exception) {
                        call.reject(e.localizedMessage)
                    }
                })

            return
        } catch (e: Exception) {
            NotificareLogger.debug("Failed to parse segment data into a NotificareUserPreference.Option.", e)
        }

        call.reject("To execute this method, you must provide either a NotificareUserSegment or a NotificarePreferenceOption.")
    }

    @PluginMethod
    public fun removeUserSegmentFromPreference(call: PluginCall) {
        val preferenceJson = call.getObject("preference") ?: run {
            call.reject("Missing 'preference' parameter.")
            return
        }

        val segmentJson = call.getObject("segment") ?: run {
            call.reject("Missing 'segment' parameter.")
            return
        }

        val preference: NotificareUserPreference = try {
            NotificareUserPreference.fromJson(preferenceJson)
        } catch (e: Exception) {
            call.reject(e.localizedMessage)
            return
        }

        try {
            val segment = NotificareUserSegment.fromJson(segmentJson)
            Notificare.authentication()
                .removeUserSegmentFromPreference(segment, preference, object : NotificareCallback<Unit> {
                    override fun onSuccess(result: Unit) {
                        call.resolve()
                    }

                    override fun onFailure(e: Exception) {
                        call.reject(e.localizedMessage)
                    }
                })

            return
        } catch (e: Exception) {
            NotificareLogger.debug("Failed to parse segment data into a NotificareUserSegment.", e)
        }

        try {
            val option = NotificareUserPreference.Option.fromJson(segmentJson)
            Notificare.authentication()
                .removeUserSegmentFromPreference(option, preference, object : NotificareCallback<Unit> {
                    override fun onSuccess(result: Unit) {
                        call.resolve()
                    }

                    override fun onFailure(e: Exception) {
                        call.reject(e.localizedMessage)
                    }
                })

            return
        } catch (e: Exception) {
            NotificareLogger.debug("Failed to parse segment data into a NotificareUserPreference.Option.", e)
        }

        call.reject("To execute this method, you must provide either a NotificareUserSegment or a NotificarePreferenceOption.")
    }
}
