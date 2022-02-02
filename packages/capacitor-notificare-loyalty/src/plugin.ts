import { registerPlugin } from '@capacitor/core';

import type { NotificarePass } from './models/notificare-pass';

export const NativePlugin = registerPlugin<NotificareLoyaltyPlugin>('NotificareLoyaltyPlugin', {
  web: () => import('./web').then((m) => new m.NotificareLoyaltyPluginWeb()),
});

export interface NotificareLoyaltyPlugin {
  //
  // Methods
  //

  fetchPassBySerial(options: { serial: string }): Promise<{ result: NotificarePass }>;

  fetchPassByBarcode(options: { barcode: string }): Promise<{ result: NotificarePass }>;

  present(options: { pass: NotificarePass }): Promise<void>;
}
