import { WebPlugin } from '@capacitor/core';

import type { NotificarePass } from './models/notificare-pass';
import type { NotificareLoyaltyPlugin } from './plugin';

export class NotificareLoyaltyPluginWeb extends WebPlugin implements NotificareLoyaltyPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchPassBySerial(_options: { serial: string }): Promise<{ result: NotificarePass }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchPassByBarcode(_options: { barcode: string }): Promise<{ result: NotificarePass }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  present(_options: { pass: NotificarePass }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}
