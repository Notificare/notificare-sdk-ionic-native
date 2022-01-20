import { WebPlugin } from '@capacitor/core';

import type { NotificarePlugin } from './definitions';

export class NotificarePluginWeb extends WebPlugin implements NotificarePlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async echo(_options: { value: string }): Promise<{ value: string }> {
    throw this.unimplemented('Not implemented on web.');
  }
}
