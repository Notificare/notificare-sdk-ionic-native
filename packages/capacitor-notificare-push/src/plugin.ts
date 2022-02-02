import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

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
  // Event bridge
  //

  addListener(
    eventName: string,
    listenerFunc: (data: any) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}
