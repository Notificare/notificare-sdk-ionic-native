import { WebPlugin } from '@capacitor/core';
import type { NotificareNotification, NotificareNotificationAction } from 'capacitor-notificare';

import type { NotificarePushUIPlugin } from './plugin';

export class NotificarePushUIPluginWeb extends WebPlugin implements NotificarePushUIPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  presentNotification(_options: { notification: NotificareNotification }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  presentAction(_options: {
    notification: NotificareNotification;
    action: NotificareNotificationAction;
  }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}
