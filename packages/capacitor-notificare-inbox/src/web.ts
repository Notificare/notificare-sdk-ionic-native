import { WebPlugin } from '@capacitor/core';

import type { NotificareInboxPlugin } from './definitions';

export class NotificareInboxPluginWeb extends WebPlugin implements NotificareInboxPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async echo(_options: { value: string }): Promise<{ value: string }> {
    throw this.unimplemented('Not implemented on web.');
  }
}
