import { WebPlugin } from '@capacitor/core';

import type { NotificareAuthenticationPlugin } from './definitions';

export class NotificareAuthenticationPluginWeb extends WebPlugin implements NotificareAuthenticationPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async echo(_options: { value: string }): Promise<{ value: string }> {
    throw this.unimplemented('Not implemented on web.');
  }
}
