import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

import type { NotificareUser } from './models/notificare-user';
import type { NotificareUserPreference, NotificareUserPreferenceOption } from './models/notificare-user-preference';
import type { NotificareUserSegment } from './models/notificare-user-segment';

export const NativePlugin = registerPlugin<NotificareAuthenticationPlugin>('NotificareAuthenticationPlugin', {
  web: () => import('./web').then((m) => new m.NotificareAuthenticationPluginWeb()),
});

export interface NotificareAuthenticationPlugin {
  //
  // Methods
  //

  isLoggedIn(): Promise<{ result: boolean }>;

  login(options: { email: string; password: string }): Promise<void>;

  logout(): Promise<void>;

  fetchUserDetails(): Promise<{ result: NotificareUser }>;

  changePassword(options: { password: string }): Promise<void>;

  generatePushEmailAddress(): Promise<{ result: NotificareUser }>;

  createAccount(options: { email: string; password: string; name?: string }): Promise<void>;

  validateUser(options: { token: string }): Promise<void>;

  sendPasswordReset(options: { email: string }): Promise<void>;

  resetPassword(options: { password: string; token: string }): Promise<void>;

  fetchUserPreferences(): Promise<{ result: NotificareUserPreference[] }>;

  fetchUserSegments(): Promise<{ result: NotificareUserSegment[] }>;

  addUserSegment(options: { segment: NotificareUserSegment }): Promise<void>;

  removeUserSegment(options: { segment: NotificareUserSegment }): Promise<void>;

  addUserSegmentToPreference(options: {
    preference: NotificareUserPreference;
    segment: NotificareUserSegment | NotificareUserPreferenceOption;
  }): Promise<void>;

  removeUserSegmentFromPreference(options: {
    preference: NotificareUserPreference;
    segment: NotificareUserSegment | NotificareUserPreferenceOption;
  }): Promise<void>;

  //
  // Event bridge
  //

  addListener(
    eventName: string,
    listenerFunc: (data: any) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}
