import type { PluginListenerHandle } from '@capacitor/core';
import type { NotificareNotification } from 'capacitor-notificare';

import type { NotificareInboxItem } from './models/notificare-inbox-item';
import { NativePlugin } from './plugin';

export class NotificareInbox {
  //
  // Methods
  //

  /**
   * @returns A list of all {@link NotificareInboxItem}, sorted by the timestamp.
   */
  public static async getItems(): Promise<NotificareInboxItem[]> {
    const { result } = await NativePlugin.getItems();
    return result;
  }

  /**
   * @returns The current badge count, representing the number of unread inbox
   * items.
   */
  public static async getBadge(): Promise<number> {
    const { result } = await NativePlugin.getBadge();
    return result;
  }

  /**
   * Refreshes the inbox data, ensuring the items and badge count reflect the
   * latest server state.
   */
  public static async refresh(): Promise<void> {
    await NativePlugin.refresh();
  }

  /**
   * Opens a specified inbox item, marking it as read and returning the
   * associated notification.
   *
   * @param item The {@link NotificareInboxItem} to open.
   * @return The {@link NotificareNotification} associated with the inbox item.
   */
  public static async open(item: NotificareInboxItem): Promise<NotificareNotification> {
    const { result } = await NativePlugin.open({ item });
    return result;
  }

  /**
   * Marks the specified inbox item as read.
   *
   * @param item The {@link NotificareInboxItem} to mark as read.
   */
  public static async markAsRead(item: NotificareInboxItem): Promise<void> {
    await NativePlugin.markAsRead({ item });
  }

  /**
   * Marks all inbox items as read.
   */
  public static async markAllAsRead(): Promise<void> {
    await NativePlugin.markAllAsRead();
  }

  /**
   * Permanently removes the specified inbox item from the inbox.
   *
   * @param item The {@link NotificareInboxItem} to remove.
   */
  public static async remove(item: NotificareInboxItem): Promise<void> {
    await NativePlugin.remove({ item });
  }

  /**
   * Clears all inbox items, permanently deleting them from the inbox.
   */
  public static async clear(): Promise<void> {
    await NativePlugin.clear();
  }

  //
  // Events
  //

  /**
   * Called when the inbox is successfully updated.
   *
   * @param callback A callback that will be invoked with the result of the
   * onInboxUpdated event. It will provide an updated list of
   * {@link NotificareInboxItem}.
   */
  public static async onInboxUpdated(callback: (items: NotificareInboxItem[]) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('inbox_updated', ({ items }) => callback(items));
  }

  /**
   * Called when the unread message count badge is updated.
   *
   * @param callback A callback that will be invoked with the
   * result of the onBadgeUpdated event. It will provide an updated badge count,
   * representing current the number of unread inbox items.
   */
  public static async onBadgeUpdated(callback: (badge: number) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('badge_updated', ({ badge }) => callback(badge));
  }
}
