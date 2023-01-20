import { registerPlugin } from '@capacitor/core';
import type { NotificareNotification } from 'capacitor-notificare';

import type { NotificareUserInboxItem } from './models/notificare-user-inbox-item';
import type { NotificareUserInboxResponse } from './models/notificare-user-inbox-response';

export const NativePlugin = registerPlugin<NotificareUserInboxPlugin>('NotificareUserInboxPlugin', {
  web: () => import('./web').then((m) => new m.NotificareUserInboxPluginWeb()),
});

export interface NotificareUserInboxPlugin {
  //
  // Methods
  //

  parseResponseFromJson(options: { json: Record<string, any> }): Promise<{ result: NotificareUserInboxResponse }>;

  parseResponseFromString(options: { json: string }): Promise<{ result: NotificareUserInboxResponse }>;

  open(options: { item: NotificareUserInboxItem }): Promise<{ result: NotificareNotification }>;

  markAsRead(options: { item: NotificareUserInboxItem }): Promise<void>;

  remove(options: { item: NotificareUserInboxItem }): Promise<void>;
}
