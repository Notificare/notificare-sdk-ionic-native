import { WebPlugin } from '@capacitor/core';
import type { NotificareNotification } from 'capacitor-notificare';

import type { NotificareUserInboxItem } from './models/notificare-user-inbox-item';
import type { NotificareUserInboxResponse } from './models/notificare-user-inbox-response';
import type { NotificareUserInboxPlugin } from './plugin';

export class NotificareUserInboxPluginWeb extends WebPlugin implements NotificareUserInboxPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async parseResponseFromJson(_options: {
    json: Record<string, any>;
  }): Promise<{ result: NotificareUserInboxResponse }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  parseResponseFromString(_options: { json: string }): Promise<{ result: NotificareUserInboxResponse }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  open(_options: { item: NotificareUserInboxItem }): Promise<{ result: NotificareNotification }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  markAsRead(_options: { item: NotificareUserInboxItem }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  remove(_options: { item: NotificareUserInboxItem }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}
