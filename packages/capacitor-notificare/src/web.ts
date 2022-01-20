import { WebPlugin } from '@capacitor/core';

import type { NotificarePlugin } from './definitions';

export class NotificarePluginWeb extends WebPlugin implements NotificarePlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
