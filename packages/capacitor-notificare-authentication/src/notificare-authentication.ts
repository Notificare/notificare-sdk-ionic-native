import type { PluginListenerHandle } from '@capacitor/core';

import type { NotificareUser } from './models/notificare-user';
import type { NotificareUserPreference, NotificareUserPreferenceOption } from './models/notificare-user-preference';
import type { NotificareUserSegment } from './models/notificare-user-segment';
import { NativePlugin } from './plugin';

export class NotificareAuthentication {
  //
  // Methods
  //

  public static async isLoggedIn(): Promise<boolean> {
    const { result } = await NativePlugin.isLoggedIn();
    return result;
  }

  public static async login(email: string, password: string): Promise<void> {
    await NativePlugin.login({ email, password });
  }

  public static async logout(): Promise<void> {
    await NativePlugin.logout();
  }

  public static async fetchUserDetails(): Promise<NotificareUser> {
    const { result } = await NativePlugin.fetchUserDetails();
    return result;
  }

  public static async changePassword(password: string): Promise<void> {
    await NativePlugin.changePassword({ password });
  }

  public static async generatePushEmailAddress(): Promise<NotificareUser> {
    const { result } = await NativePlugin.generatePushEmailAddress();
    return result;
  }

  public static async createAccount(email: string, password: string, name?: string): Promise<void> {
    await NativePlugin.createAccount({ email, password, name });
  }

  public static async validateUser(token: string): Promise<void> {
    await NativePlugin.validateUser({ token });
  }

  public static async sendPasswordReset(email: string): Promise<void> {
    await NativePlugin.sendPasswordReset({ email });
  }

  public static async resetPassword(password: string, token: string): Promise<void> {
    await NativePlugin.resetPassword({ password, token });
  }

  public static async fetchUserPreferences(): Promise<NotificareUserPreference[]> {
    const { result } = await NativePlugin.fetchUserPreferences();
    return result;
  }

  public static async fetchUserSegments(): Promise<NotificareUserSegment[]> {
    const { result } = await NativePlugin.fetchUserSegments();
    return result;
  }

  public static async addUserSegment(segment: NotificareUserSegment): Promise<void> {
    await NativePlugin.addUserSegment({ segment });
  }

  public static async removeUserSegment(segment: NotificareUserSegment): Promise<void> {
    await NativePlugin.removeUserSegment({ segment });
  }

  public static async addUserSegmentToPreference(
    preference: NotificareUserPreference,
    segment: NotificareUserSegment | NotificareUserPreferenceOption
  ): Promise<void> {
    await NativePlugin.addUserSegmentToPreference({ preference, segment });
  }

  public static async removeUserSegmentFromPreference(
    preference: NotificareUserPreference,
    segment: NotificareUserSegment | NotificareUserPreferenceOption
  ): Promise<void> {
    await NativePlugin.removeUserSegmentFromPreference({ preference, segment });
  }

  //
  // Events
  //

  public static onPasswordResetTokenReceived(
    callback: (token: string) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('password_reset_token_received', ({ token }) => callback(token));
  }

  public static onValidateUserTokenReceived(
    callback: (token: string) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('validate_user_token_received', ({ token }) => callback(token));
  }
}
