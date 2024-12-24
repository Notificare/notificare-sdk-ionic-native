import type { NotificareNotification } from 'capacitor-notificare';

import type { NotificareUserInboxItem } from './models/notificare-user-inbox-item';
import type { NotificareUserInboxResponse } from './models/notificare-user-inbox-response';
import { NativePlugin } from './plugin';

export class NotificareUserInbox {
  //
  // Methods
  //

  /**
   * Parses a JSON {@link Record} to produce a {@link NotificareUserInboxResponse}.
   *
   * This method takes a raw JSON {@link Record} and converts it into a structured
   * {@link NotificareUserInboxResponse}.
   *
   * @param json The JSON Record representing the user inbox response.
   * @return A {@link NotificareUserInboxResponse} object parsed from the
   * provided JSON string.
   */
  public static async parseResponseFromJson(json: Record<string, any>): Promise<NotificareUserInboxResponse> {
    const { result } = await NativePlugin.parseResponseFromJson({ json });
    return result;
  }

  /**
   * Parses a JSON string to produce a {@link NotificareUserInboxResponse}.
   *
   * This method takes a raw JSON string and converts it into a structured
   * {@link NotificareUserInboxResponse}.
   *
   * @param json The JSON string representing the user inbox response.
   * @return A {@link NotificareUserInboxResponse} object parsed from the
   * provided JSON string.
   */
  public static async parseResponseFromString(json: string): Promise<NotificareUserInboxResponse> {
    const { result } = await NativePlugin.parseResponseFromString({ json });
    return result;
  }

  /**
   * Opens an inbox item and retrieves its associated notification.
   *
   * This function opens the provided {@link NotificareUserInboxItem}
   * and returns the associated {@link NotificareNotification}.
   * This operation marks the item as read.
   *
   * @param item The {@link NotificareUserInboxItem} to be opened.
   * @return The {@link NotificareNotification} associated with the opened inbox
   * item.
   */
  public static async open(item: NotificareUserInboxItem): Promise<NotificareNotification> {
    const { result } = await NativePlugin.open({ item });
    return result;
  }

  /**
   * Marks an inbox item as read.
   *
   * This function updates the status of the provided
   * {@link NotificareUserInboxItem} to read.
   *
   * @param item The {@link NotificareUserInboxItem} to mark as read.
   */
  public static async markAsRead(item: NotificareUserInboxItem): Promise<void> {
    await NativePlugin.markAsRead({ item });
  }

  /**
   * Removes an inbox item from the user's inbox.
   *
   * This function deletes the provided {@link NotificareUserInboxItem}
   * from the user's inbox.
   *
   * @param item The {@link NotificareUserInboxItem} to be removed.
   */
  public static async remove(item: NotificareUserInboxItem): Promise<void> {
    await NativePlugin.remove({ item });
  }
}
