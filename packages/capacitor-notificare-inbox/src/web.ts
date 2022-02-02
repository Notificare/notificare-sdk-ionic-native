import { WebPlugin } from '@capacitor/core';
import type { NotificareNotification } from 'capacitor-notificare';

import type { NotificareInboxItem } from './models/notificare-inbox-item';
import type { NotificareInboxPlugin } from './plugin';

export class NotificareInboxPluginWeb extends WebPlugin implements NotificareInboxPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItems(): Promise<{ result: NotificareInboxItem[] }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getBadge(): Promise<{ result: number }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  refresh(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  open(_options: { item: NotificareInboxItem }): Promise<{ result: NotificareNotification }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  markAsRead(_options: { item: NotificareInboxItem }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  markAllAsRead(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(_options: { item: NotificareInboxItem }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}
