import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';
import type { NotificareNotification, NotificareNotificationAction } from 'capacitor-notificare';

export const NativePlugin = registerPlugin<NotificarePushUIPlugin>('NotificarePushUIPlugin', {
  web: () => import('./web').then((m) => new m.NotificarePushUIPluginWeb()),
});

export interface NotificarePushUIPlugin {
  //
  // Methods
  //

  presentNotification(options: { notification: NotificareNotification }): Promise<void>;

  presentAction(options: { notification: NotificareNotification; action: NotificareNotificationAction }): Promise<void>;

  //
  // Event bridge
  //

  addListener(eventName: string, listenerFunc: (data: any) => void): Promise<PluginListenerHandle>;
}
