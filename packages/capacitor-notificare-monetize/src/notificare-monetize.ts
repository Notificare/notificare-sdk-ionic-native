import type { PluginListenerHandle } from '@capacitor/core';

import type { NotificareProduct } from './models/notificare-product';
import type { NotificarePurchase } from './models/notificare-purchase';
import { NativePlugin } from './plugin';

export class NotificareMonetize {
  //
  // Methods
  //

  public static async getProducts(): Promise<NotificareProduct[]> {
    const { result } = await NativePlugin.getProducts();
    return result;
  }

  public static async getPurchases(): Promise<NotificarePurchase[]> {
    const { result } = await NativePlugin.getPurchases();
    return result;
  }

  public static async refresh(): Promise<void> {
    await NativePlugin.refresh();
  }

  public static async startPurchaseFlow(product: NotificareProduct): Promise<void> {
    await NativePlugin.startPurchaseFlow({ product });
  }

  //
  // Events
  //

  public static onProductsUpdated(
    callback: (products: NotificareProduct[]) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('products_updated', ({ products }) => callback(products));
  }

  public static onPurchasesUpdated(
    callback: (purchases: NotificarePurchase[]) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('purchases_updated', ({ purchases }) => callback(purchases));
  }

  public static onBillingSetupFinished(callback: () => void): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('billing_setup_finished', callback);
  }

  public static onBillingSetupFailed(
    callback: (data: { code: number; message: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('billing_setup_failed', callback);
  }

  public static onPurchaseFinished(
    callback: (purchase: NotificarePurchase) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('purchase_finished', callback);
  }

  public static onPurchaseRestored(
    callback: (purchase: NotificarePurchase) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('purchase_restored', callback);
  }

  public static onPurchaseCanceled(callback: () => void): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('purchase_canceled', callback);
  }

  public static onPurchaseFailed(
    callback: (data: { code?: number; message?: string; errorMessage?: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('purchase_failed', callback);
  }
}
