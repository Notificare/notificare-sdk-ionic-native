import { WebPlugin } from '@capacitor/core';

import type { NotificareScannablesPlugin } from './definitions';

export class NotificareScannablesPluginWeb extends WebPlugin implements NotificareScannablesPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async echo(_options: { value: string }): Promise<{ value: string }> {
    throw this.unimplemented('Not implemented on web.');
  }
}
