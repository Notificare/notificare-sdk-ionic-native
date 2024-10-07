import { WebPlugin } from '@capacitor/core';

import type { NotificareApplication } from './models/notificare-application';
import type { NotificareDevice } from './models/notificare-device';
import type { NotificareDoNotDisturb } from './models/notificare-do-not-disturb';
import type { NotificareDynamicLink } from './models/notificare-dynamic-link';
import type { NotificareNotification } from './models/notificare-notification';
import type { NotificarePlugin } from './plugin';

export class NotificarePluginWeb extends WebPlugin implements NotificarePlugin {
  //
  // Core
  //

  isConfigured(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  isReady(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  launch(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  unlaunch(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  getApplication(): Promise<{ result: NotificareApplication | null }> {
    throw this.unimplemented('Not implemented on web.');
  }

  fetchApplication(): Promise<{ result: NotificareApplication }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchNotification(_options: { id: string }): Promise<{ result: NotificareNotification }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchDynamicLink(_options: { url: string }): Promise<{ result: NotificareDynamicLink }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canEvaluateDeferredLink(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluateDeferredLink(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  //
  // Device module
  //

  getCurrentDevice(): Promise<{ result: NotificareDevice | null }> {
    throw this.unimplemented('Not implemented on web.');
  }

  getPreferredLanguage(): Promise<{ result: string | null }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updatePreferredLanguage(_options: { language: string | null }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(_options: { userId: string | null; userName: string | null }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser(_options: { userId: string | null; userName: string | null }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  fetchTags(): Promise<{ result: string[] }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addTag(_options: { tag: string }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addTags(_options: { tags: string[] }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeTag(_options: { tag: string }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeTags(_options: { tags: string[] }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  clearTags(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  fetchDoNotDisturb(): Promise<{ result: NotificareDoNotDisturb | null }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateDoNotDisturb(_options: { dnd: NotificareDoNotDisturb }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  clearDoNotDisturb(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  fetchUserData(): Promise<{ result: Record<string, any> }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUserData(_options: { userData: Record<string, any> }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  //
  // Events
  //

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logCustom(_options: { event: string; data?: Record<string, any> }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}
