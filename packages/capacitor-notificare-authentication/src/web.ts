import { WebPlugin } from '@capacitor/core';

import type { NotificareUser } from './models/notificare-user';
import type { NotificareUserPreference, NotificareUserPreferenceOption } from './models/notificare-user-preference';
import type { NotificareUserSegment } from './models/notificare-user-segment';
import type { NotificareAuthenticationPlugin } from './plugin';

export class NotificareAuthenticationPluginWeb extends WebPlugin implements NotificareAuthenticationPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isLoggedIn(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(_options: { email: string; password: string }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logout(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchUserDetails(): Promise<{ result: NotificareUser }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword(_options: { password: string }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generatePushEmailAddress(): Promise<{ result: NotificareUser }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createAccount(_options: { email: string; password: string; name?: string }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validateUser(_options: { token: string }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  sendPasswordReset(_options: { email: string }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword(_options: { password: string; token: string }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchUserPreferences(): Promise<{ result: NotificareUserPreference[] }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchUserSegments(): Promise<{ result: NotificareUserSegment[] }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addUserSegment(_options: { segment: NotificareUserSegment }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeUserSegment(_options: { segment: NotificareUserSegment }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addUserSegmentToPreference(_options: {
    preference: NotificareUserPreference;
    segment: NotificareUserSegment | NotificareUserPreferenceOption;
  }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeUserSegmentFromPreference(_options: {
    preference: NotificareUserPreference;
    segment: NotificareUserSegment | NotificareUserPreferenceOption;
  }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}
