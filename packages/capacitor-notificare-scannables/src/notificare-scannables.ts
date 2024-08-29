import type { PluginListenerHandle } from '@capacitor/core';

import type { NotificareScannable } from './models/notificare-scannable';
import { NativePlugin } from './plugin';

export class NotificareScannables {
  //
  // Methods
  //

  public static async canStartNfcScannableSession(): Promise<boolean> {
    const { result } = await NativePlugin.canStartNfcScannableSession();
    return result;
  }

  public static async startScannableSession(): Promise<void> {
    await NativePlugin.startScannableSession();
  }

  public static async startNfcScannableSession(): Promise<void> {
    await NativePlugin.startNfcScannableSession();
  }

  public static async startQrCodeScannableSession(): Promise<void> {
    await NativePlugin.startQrCodeScannableSession();
  }

  public static async fetch(tag: string): Promise<NotificareScannable> {
    const { result } = await NativePlugin.fetch({ tag });
    return result;
  }

  //
  // Events
  //

  public static async onScannableDetected(
    callback: (scannable: NotificareScannable) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('scannable_detected', callback);
  }

  public static async onScannableSessionFailed(
    callback: (error: string | null) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('scannable_session_failed', ({ error }) => callback(error));
  }
}
