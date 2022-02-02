import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

export const NativePlugin = registerPlugin<NotificareGeoPlugin>('NotificareGeoPlugin', {
  web: () => import('./web').then((m) => new m.NotificareGeoPluginWeb()),
});

export interface NotificareGeoPlugin {
  //
  // Methods
  //

  hasLocationServicesEnabled(): Promise<{ result: boolean }>;

  hasBluetoothEnabled(): Promise<{ result: boolean }>;

  enableLocationUpdates(): Promise<void>;

  disableLocationUpdates(): Promise<void>;

  //
  // Event bridge
  //

  addListener(
    eventName: string,
    listenerFunc: (data: any) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}
