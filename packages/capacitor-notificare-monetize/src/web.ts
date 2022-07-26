import { WebPlugin } from '@capacitor/core';

import type { NotificareProduct } from './models/notificare-product';
import type { NotificarePurchase } from './models/notificare-purchase';
import type { NotificareMonetizePlugin } from './plugin';

export class NotificareMonetizePluginWeb extends WebPlugin implements NotificareMonetizePlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getProducts(): Promise<{ result: NotificareProduct[] }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getPurchases(): Promise<{ result: NotificarePurchase[] }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  refresh(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startPurchaseFlow(_options: { product: NotificareProduct }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}
