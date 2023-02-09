import type { NotificareNotification } from 'capacitor-notificare';

import type { NotificareUserInboxItem } from './models/notificare-user-inbox-item';
import type { NotificareUserInboxResponse } from './models/notificare-user-inbox-response';
import { NativePlugin } from './plugin';

export class NotificareUserInbox {
  //
  // Methods
  //

  public static async parseResponseFromJson(json: Record<string, any>): Promise<NotificareUserInboxResponse> {
    const { result } = await NativePlugin.parseResponseFromJson({ json });
    return result;
  }

  public static async parseResponseFromString(json: string): Promise<NotificareUserInboxResponse> {
    const { result } = await NativePlugin.parseResponseFromString({ json });
    return result;
  }

  public static async open(item: NotificareUserInboxItem): Promise<NotificareNotification> {
    const { result } = await NativePlugin.open({ item });
    return result;
  }

  public static async markAsRead(item: NotificareUserInboxItem): Promise<void> {
    await NativePlugin.markAsRead({ item });
  }

  public static async remove(item: NotificareUserInboxItem): Promise<void> {
    await NativePlugin.remove({ item });
  }
}
