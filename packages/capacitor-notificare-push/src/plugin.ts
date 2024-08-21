import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

import type { PushPermissionStatus } from './enums';
import type { NotificarePushSubscription } from './models/notificare-push-subscription';
import type { NotificareTransport } from './models/notificare-transport';
import type { PushPermissionRationale } from './notificare-push';

export const NativePlugin = registerPlugin<NotificarePushPlugin>('NotificarePushPlugin', {
  web: () => import('./web').then((m) => new m.NotificarePushPluginWeb()),
});

export interface NotificarePushPlugin {
  //
  // Methods
  //

  setAuthorizationOptions(options: { options: string[] }): Promise<void>;

  setCategoryOptions(options: { options: string[] }): Promise<void>;

  setPresentationOptions(options: { options: string[] }): Promise<void>;

  hasRemoteNotificationsEnabled(): Promise<{ result: boolean }>;

  getTransport(): Promise<{ result: NotificareTransport | null }>;

  getSubscription(): Promise<{ result: NotificarePushSubscription | null }>;

  allowedUI(): Promise<{ result: boolean }>;

  enableRemoteNotifications(): Promise<void>;

  disableRemoteNotifications(): Promise<void>;

  //
  // Permission utilities
  //

  checkPermissionStatus(): Promise<{ result: PushPermissionStatus }>;

  shouldShowPermissionRationale(): Promise<{ result: boolean }>;

  presentPermissionRationale(options: { rationale: PushPermissionRationale }): Promise<void>;

  requestPermission(): Promise<{ result: PushPermissionStatus }>;

  openAppSettings(): Promise<void>;

  //
  // Event bridge
  //

  addListener(
    eventName: string,
    listenerFunc: (data: any) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}
