import type { PluginListenerHandle } from '@capacitor/core';

import type { NotificareApplication } from './models/notificare-application';
import type { NotificareDevice } from './models/notificare-device';
import type { NotificareDynamicLink } from './models/notificare-dynamic-link';
import type { NotificareNotification } from './models/notificare-notification';
import { NotificareDeviceModule } from './notificare-device-module';
import { NotificareEventsModule } from './notificare-events-module';
import { _Notificare } from './plugin';

export class Notificare {
  private static readonly deviceModule = new NotificareDeviceModule();
  private static readonly eventsModule = new NotificareEventsModule();

  //
  // Modules
  //

  public static device(): NotificareDeviceModule {
    return this.deviceModule;
  }

  public static events(): NotificareEventsModule {
    return this.eventsModule;
  }

  //
  // Methods
  //

  /**
   * Indicates whether Notificare has been configured.
   *
   * @returns {Promise<boolean>} - A promise that resolves to `true` if
   * Notificare is successfully configured, and `false` otherwise.
   */
  public static async isConfigured(): Promise<boolean> {
    const { result } = await _Notificare.isConfigured();
    return result;
  }

  /**
   * Indicates whether Notificare is ready.
   *
   * @returns {Promise<boolean>} - A promise that resolves to`true` once
   * the SDK has completed the initialization process and is ready for use.
   */
  public static async isReady(): Promise<boolean> {
    const { result } = await _Notificare.isReady();
    return result;
  }

  /**
   * Launches the Notificare SDK, and all the additional available modules,
   * preparing them for use.
   *
   * @returns {Promise<void>} - A promise that resolves when the Notificare SDK
   * and its modules have been successfully launched and are ready for use.
   */
  public static async launch(): Promise<void> {
    await _Notificare.launch();
  }

  /**
   * Unlaunches the Notificare SDK.
   *
   * This method shuts down the SDK, removing all data, both locally and remotely
   * in the servers. It destroys all the device's data permanently.
   *
   * @returns {Promise<void>} - A promise that resolves when the SDK has been
   * successfully unlaunched and all data has been removed.
   */
  public static async unlaunch(): Promise<void> {
    await _Notificare.unlaunch();
  }

  /**
   * Provides the current application metadata, if available.
   *
   * @returns {Promise<NotificareApplication | null>} - A promise that resolves
   * to a {@link NotificareApplication} object representing the configured
   * application, or `null` if the application is not yet available.
   */
  public static async getApplication(): Promise<NotificareApplication | null> {
    const { result } = await _Notificare.getApplication();
    return result;
  }

  /**
   * Fetches the application metadata.
   *
   * @return {Promise<NotificareApplication>} - A promise that resolves to a
   * {@link NotificareApplication} object containing the application metadata.
   */
  public static async fetchApplication(): Promise<NotificareApplication> {
    const { result } = await _Notificare.fetchApplication();
    return result;
  }

  /**
   * Fetches a {@link NotificareNotification} by its ID.
   *
   * @param {string} id The ID of the notification to fetch.
   * @return {Promise<NotificareNotification>} - A promise that resolves to
   * the {@link NotificareNotification} object associated with the provided ID.
   */
  public static async fetchNotification(id: string): Promise<NotificareNotification> {
    const { result } = await _Notificare.fetchNotification({ id });
    return result;
  }

  /**
   * Fetches a {@link NotificareDynamicLink} from a URL.
   *
   * @param {string} url - The URL to fetch the dynamic link from.
   * @return {Promise<NotificareDynamicLink>} - A promise that resolves to
   * the {@link NotificareDynamicLink} object.
   */
  public static async fetchDynamicLink(url: string): Promise<NotificareDynamicLink> {
    const { result } = await _Notificare.fetchDynamicLink({ url });
    return result;
  }

  /**
   * Checks if a deferred link exists and can be evaluated.
   *
   * @return {Promise<boolean>} - A promise that resolves to `true` if
   * a deferred link can be evaluated, `false` otherwise.
   */
  public static async canEvaluateDeferredLink(): Promise<boolean> {
    const { result } = await _Notificare.canEvaluateDeferredLink();
    return result;
  }

  /**
   * Evaluates the deferred link. Once the deferred link is evaluated, Notificare
   * will open the resolved deep link.
   *
   * @return {Promise<boolean>} - A promise that resolves to `true` if
   * the deferred link was successfully evaluated, `false` otherwise.
   */
  public static async evaluateDeferredLink(): Promise<boolean> {
    const { result } = await _Notificare.evaluateDeferredLink();
    return result;
  }

  //
  // Events
  //

  /**
   * Called when the Notificare SDK is fully ready and the application metadata
   * is available.
   *
   * This method is invoked after the SDK has been successfully launched and is
   * available for use.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onReady event. It will the {@link NotificareApplication} object containing
   * the application's metadata.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onReady event.
   */
  public static async onReady(callback: (application: NotificareApplication) => void): Promise<PluginListenerHandle> {
    return await _Notificare.addListener('ready', callback);
  }

  /**
   * Called when the Notificare SDK has been unlaunched.
   *
   * This method is invoked after the SDK has been shut down (unlaunched) and
   * is no longer in use.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onUnlaunched event.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onUnlaunched event.
   */
  public static async onUnlaunched(callback: () => void): Promise<PluginListenerHandle> {
    return await _Notificare.addListener('unlaunched', callback);
  }

  /**
   * Called when the device has been successfully registered with the Notificare
   * platform.
   *
   * This method is triggered after the device is initially created, which
   * happens the first time `launch()` is called.
   * Once created, the method will not trigger again unless the device is
   * deleted by calling `unlaunch()` and created again on a new `launch()`.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onDeviceRegistered event. It will provide the registered {@link NotificareDevice}
   * instance representing the device's registration details.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onDeviceRegistered event.
   */
  public static async onDeviceRegistered(callback: (device: NotificareDevice) => void): Promise<PluginListenerHandle> {
    return await _Notificare.addListener('device_registered', callback);
  }

  /**
   * Called when the device opens a URL.
   *
   * This method is invoked when the device opens a URL.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onUrlOpened event. It will provide the opened URL.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onUrlOpened event.
   */
  public static async onUrlOpened(callback: (url: string) => void): Promise<PluginListenerHandle> {
    return await _Notificare.addListener('url_opened', ({ url }) => callback(url));
  }
}
