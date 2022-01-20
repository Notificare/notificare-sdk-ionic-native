import { WebPlugin } from '@capacitor/core';

import type { NotificareAssetsPlugin } from './definitions';

export class NotificareAssetsPluginWeb extends WebPlugin implements NotificareAssetsPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async echo(_options: { value: string }): Promise<{ value: string }> {
    throw this.unimplemented('Not implemented on web.');
  }
}
