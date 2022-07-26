import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

import type { NotificareProduct } from './models/notificare-product';
import type { NotificarePurchase } from './models/notificare-purchase';

export const NativePlugin = registerPlugin<NotificareMonetizePlugin>('NotificareMonetizePlugin', {
  web: () => import('./web').then((m) => new m.NotificareMonetizePluginWeb()),
});

export interface NotificareMonetizePlugin {
  //
  // Methods
  //

  getProducts(): Promise<{ result: NotificareProduct[] }>;

  getPurchases(): Promise<{ result: NotificarePurchase[] }>;

  refresh(): Promise<void>;

  startPurchaseFlow(options: { product: NotificareProduct }): Promise<void>;

  //
  // Event bridge
  //

  addListener(
    eventName: string,
    listenerFunc: (data: any) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}
