import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

import type { NotificareScannable } from './models/notificare-scannable';

export const NativePlugin = registerPlugin<NotificareScannablesPlugin>('NotificareScannablesPlugin', {
  web: () => import('./web').then((m) => new m.NotificareScannablesPluginWeb()),
});

export interface NotificareScannablesPlugin {
  //
  // Methods
  //

  canStartNfcScannableSession(): Promise<{ result: boolean }>;

  startScannableSession(): Promise<void>;

  startNfcScannableSession(): Promise<void>;

  startQrCodeScannableSession(): Promise<void>;

  fetch(options: { tag: string }): Promise<{ result: NotificareScannable }>;

  //
  // Event bridge
  //

  addListener(eventName: string, listenerFunc: (data: any) => void): Promise<PluginListenerHandle>;
}
