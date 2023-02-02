import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

import type { NotificationsPermissionStatus } from './enums';
import type { PermissionRationale } from './notificare-push';

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

  allowedUI(): Promise<{ result: boolean }>;

  enableRemoteNotifications(): Promise<void>;

  disableRemoteNotifications(): Promise<void>;

  //
  // Permission utilities
  //

  checkPermissionStatus(): Promise<{ result: NotificationsPermissionStatus }>;

  shouldShowPermissionRationale(): Promise<{ result: boolean }>;

  presentPermissionRationale(options: { rationale: PermissionRationale }): Promise<void>;

  requestPermission(options: { options?: string[] }): Promise<{ result: NotificationsPermissionStatus }>;

  openAppSettings(): Promise<void>;

  //
  // Event bridge
  //

  addListener(
    eventName: string,
    listenerFunc: (data: any) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}
