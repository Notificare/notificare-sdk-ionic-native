import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';
import type { NotificareNotification } from 'capacitor-notificare';

import type { NotificareInboxItem } from './models/notificare-inbox-item';

export const NativePlugin = registerPlugin<NotificareInboxPlugin>('NotificareInboxPlugin', {
  web: () => import('./web').then((m) => new m.NotificareInboxPluginWeb()),
});

export interface NotificareInboxPlugin {
  //
  // Methods
  //

  getItems(): Promise<{ result: NotificareInboxItem[] }>;

  getBadge(): Promise<{ result: number }>;

  refresh(): Promise<void>;

  open(options: { item: NotificareInboxItem }): Promise<{ result: NotificareNotification }>;

  markAsRead(options: { item: NotificareInboxItem }): Promise<void>;

  markAllAsRead(): Promise<void>;

  remove(options: { item: NotificareInboxItem }): Promise<void>;

  clear(): Promise<void>;

  //
  // Event bridge
  //

  addListener(eventName: string, listenerFunc: (data: any) => void): Promise<PluginListenerHandle>;
}
