import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

import type { NotificareApplication } from './models/notificare-application';
import type { NotificareDevice } from './models/notificare-device';
import type { NotificareDoNotDisturb } from './models/notificare-do-not-disturb';
import type { NotificareDynamicLink } from './models/notificare-dynamic-link';
import type { NotificareNotification } from './models/notificare-notification';

export const _Notificare = registerPlugin<NotificarePlugin>('NotificarePlugin', {
  web: () => import('./web').then((m) => new m.NotificarePluginWeb()),
});

export interface NotificarePlugin {
  //
  // Core
  //

  isConfigured(): Promise<{ result: boolean }>;

  isReady(): Promise<{ result: boolean }>;

  launch(): Promise<void>;

  unlaunch(): Promise<void>;

  getApplication(): Promise<{ result: NotificareApplication | null }>;

  fetchApplication(): Promise<{ result: NotificareApplication }>;

  fetchNotification(options: { id: string }): Promise<{ result: NotificareNotification }>;

  fetchDynamicLink(options: { url: string }): Promise<{ result: NotificareDynamicLink }>;

  canEvaluateDeferredLink(): Promise<{ result: boolean }>;

  evaluateDeferredLink(): Promise<{ result: boolean }>;

  //
  // Device module
  //

  getCurrentDevice(): Promise<{ result: NotificareDevice | null }>;

  getPreferredLanguage(): Promise<{ result: string | null }>;

  updatePreferredLanguage(options: { language: string | null }): Promise<void>;

  /**
   * @deprecated Use updateUser() instead.
   */
  register(options: { userId: string | null; userName: string | null }): Promise<void>;

  updateUser(options: { userId: string | null; userName: string | null }): Promise<void>;

  fetchTags(): Promise<{ result: string[] }>;

  addTag(options: { tag: string }): Promise<void>;

  addTags(options: { tags: string[] }): Promise<void>;

  removeTag(options: { tag: string }): Promise<void>;

  removeTags(options: { tags: string[] }): Promise<void>;

  clearTags(): Promise<void>;

  fetchDoNotDisturb(): Promise<{ result: NotificareDoNotDisturb | null }>;

  updateDoNotDisturb(options: { dnd: NotificareDoNotDisturb }): Promise<void>;

  clearDoNotDisturb(): Promise<void>;

  fetchUserData(): Promise<{ result: Record<string, any> }>;

  updateUserData(options: { userData: Record<string, any> }): Promise<void>;

  //
  // Events module
  //

  logCustom(options: { event: string; data?: Record<string, any> }): Promise<void>;

  //
  // Event bridge
  //

  addListener(
    eventName: string,
    listenerFunc: (data: any) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}
