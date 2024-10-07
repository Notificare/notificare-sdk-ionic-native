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

  public static async isConfigured(): Promise<boolean> {
    const { result } = await _Notificare.isConfigured();
    return result;
  }

  public static async isReady(): Promise<boolean> {
    const { result } = await _Notificare.isReady();
    return result;
  }

  public static async launch(): Promise<void> {
    await _Notificare.launch();
  }

  public static async unlaunch(): Promise<void> {
    await _Notificare.unlaunch();
  }

  public static async getApplication(): Promise<NotificareApplication | null> {
    const { result } = await _Notificare.getApplication();
    return result;
  }

  public static async fetchApplication(): Promise<NotificareApplication> {
    const { result } = await _Notificare.fetchApplication();
    return result;
  }

  public static async fetchNotification(id: string): Promise<NotificareNotification> {
    const { result } = await _Notificare.fetchNotification({ id });
    return result;
  }

  public static async fetchDynamicLink(url: string): Promise<NotificareDynamicLink> {
    const { result } = await _Notificare.fetchDynamicLink({ url });
    return result;
  }

  public static async canEvaluateDeferredLink(): Promise<boolean> {
    const { result } = await _Notificare.canEvaluateDeferredLink();
    return result;
  }

  public static async evaluateDeferredLink(): Promise<boolean> {
    const { result } = await _Notificare.evaluateDeferredLink();
    return result;
  }

  //
  // Events
  //

  public static async onReady(callback: (application: NotificareApplication) => void): Promise<PluginListenerHandle> {
    return await _Notificare.addListener('ready', callback);
  }

  public static async onUnlaunched(callback: () => void): Promise<PluginListenerHandle> {
    return await _Notificare.addListener('unlaunched', callback);
  }

  public static async onDeviceRegistered(callback: (device: NotificareDevice) => void): Promise<PluginListenerHandle> {
    return await _Notificare.addListener('device_registered', callback);
  }

  public static async onUrlOpened(callback: (url: string) => void): Promise<PluginListenerHandle> {
    return await _Notificare.addListener('url_opened', ({ url }) => callback(url));
  }
}
