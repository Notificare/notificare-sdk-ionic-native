import { WebPlugin } from '@capacitor/core';

import type { NotificareGeoPlugin } from './definitions';

export class NotificareGeoPluginWeb extends WebPlugin implements NotificareGeoPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async echo(_options: { value: string }): Promise<{ value: string }> {
    throw this.unimplemented('Not implemented on web.');
  }
}
