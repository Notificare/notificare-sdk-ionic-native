import type { PluginListenerHandle } from '@capacitor/core';

import type { NotificareScannable } from './models/notificare-scannable';
import { NativePlugin } from './plugin';

export class NotificareScannables {
  //
  // Methods
  //

  /**
   * Indicates whether an NFC scannable session can be started on the current device.
   *
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the device
   * supports NFC scanning, otherwise `false`.
   */
  public static async canStartNfcScannableSession(): Promise<boolean> {
    const { result } = await NativePlugin.canStartNfcScannableSession();
    return result;
  }

  /**
   * Starts a scannable session, automatically selecting the best scanning method
   * available.
   *
   * If NFC is available, it starts an NFC-based scanning session. If NFC is not
   * available, it defaults to starting a QR code scanning session.
   *
   * @returns {Promise<void>} - A promise that resolves when the scanning session
   * has been successfully started.
   */
  public static async startScannableSession(): Promise<void> {
    await NativePlugin.startScannableSession();
  }

  /**
   * Starts an NFC scannable session.
   *
   * Initiates an NFC-based scan, allowing the user to scan NFC tags. This will
   * only function on devices that support NFC and have it enabled.
   *
   * @returns {Promise<void>} - A promise that resolves when the NFC scanning session
   * has been successfully started.
   */
  public static async startNfcScannableSession(): Promise<void> {
    await NativePlugin.startNfcScannableSession();
  }

  /**
   * Starts a QR code scannable session.
   *
   * Initiates a QR code-based scan using the device camera, allowing the user
   * to scan QR codes.
   *
   * @returns {Promise<void>} - A promise that resolves when the QR code scanning session
   * has been successfully started.
   */
  public static async startQrCodeScannableSession(): Promise<void> {
    await NativePlugin.startQrCodeScannableSession();
  }

  /**
   * Fetches a scannable item by its tag.
   *
   * @param {string} tag - The tag identifier for the scannable item to be fetched.
   * @return {Promise<NotificareScannable>} - A promise that resolves to the
   * {@link NotificareScannable} object corresponding to the provided tag.
   */
  public static async fetch(tag: string): Promise<NotificareScannable> {
    const { result } = await NativePlugin.fetch({ tag });
    return result;
  }

  //
  // Events
  //

  /**
   * Called when a scannable item is detected during a scannable session.
   *
   * This method is triggered when either an NFC tag or a QR code is successfully
   * scanned, and the corresponding [NotificareScannable] is retrieved. This
   * callback will be invoked on the main thread.
   *
   * @param callback - A callback that will be invoked with the
   * result of the onScannableDetected event. It will provide the detected
   * {@link NotificareScannable}.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onScannableDetected event.
   */
  public static async onScannableDetected(
    callback: (scannable: NotificareScannable) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('scannable_detected', callback);
  }

  /**
   * Called when an error occurs during a scannable session.
   *
   * This method is triggered if there's a failure while scanning or processing
   * the scannable item, either due to NFC or QR code scanning issues, or if the
   * scannable item cannot be retrieved. This callback will be invoked on the
   * main thread.
   *
   * @param callback - A callback that will be invoked with the
   * result of the onScannableSessionFailed event. It will provide the error
   * that caused the session to fail, if it exists.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onScannablesSessionFailed event.
   */
  public static async onScannableSessionFailed(
    callback: (error: string | null) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('scannable_session_failed', ({ error }) => callback(error));
  }
}
