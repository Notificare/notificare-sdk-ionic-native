import { WebPlugin } from '@capacitor/core';

import type { NotificareAsset } from './models/notificare-asset';
import type { NotificareAssetsPlugin } from './plugin';

export class NotificareAssetsPluginWeb extends WebPlugin implements NotificareAssetsPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async fetch(_options: { group: string }): Promise<{ result: NotificareAsset[] }> {
    throw this.unimplemented('Not implemented on web.');
  }
}
