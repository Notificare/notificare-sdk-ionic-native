import type { PluginListenerHandle } from '@capacitor/core';
import type { NotificareNotification } from 'capacitor-notificare';

import type { NotificareInboxItem } from './models/notificare-inbox-item';
import { NativePlugin } from './plugin';

export class NotificareInbox {
  //
  // Methods
  //

  public static async getItems(): Promise<NotificareInboxItem[]> {
    const { result } = await NativePlugin.getItems();
    return result;
  }

  public static async getBadge(): Promise<number> {
    const { result } = await NativePlugin.getBadge();
    return result;
  }

  public static async refresh(): Promise<void> {
    await NativePlugin.refresh();
  }

  public static async open(item: NotificareInboxItem): Promise<NotificareNotification> {
    const { result } = await NativePlugin.open({ item });
    return result;
  }

  public static async markAsRead(item: NotificareInboxItem): Promise<void> {
    await NativePlugin.markAsRead({ item });
  }

  public static async markAllAsRead(): Promise<void> {
    await NativePlugin.markAllAsRead();
  }

  public static async remove(item: NotificareInboxItem): Promise<void> {
    await NativePlugin.remove({ item });
  }

  public static async clear(): Promise<void> {
    await NativePlugin.clear();
  }

  //
  // Events
  //

  public static async onInboxUpdated(callback: (items: NotificareInboxItem[]) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('inbox_updated', ({ items }) => callback(items));
  }

  public static async onBadgeUpdated(callback: (badge: number) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('badge_updated', ({ badge }) => callback(badge));
  }
}
