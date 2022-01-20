import { WebPlugin } from '@capacitor/core';

import type { NotificarePushPlugin } from './definitions';

export class NotificarePushPluginWeb extends WebPlugin implements NotificarePushPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async echo(_options: { value: string }): Promise<{ value: string }> {
    throw this.unimplemented('Not implemented on web.');
  }
}
