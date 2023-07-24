import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

import type { PermissionGroup, PermissionStatus } from './enums';
import type { NotificareRegion } from './models/notificare-region';
import type { PermissionRationale } from './notificare-geo';

export const NativePlugin = registerPlugin<NotificareGeoPlugin>('NotificareGeoPlugin', {
  web: () => import('./web').then((m) => new m.NotificareGeoPluginWeb()),
});

export interface NotificareGeoPlugin {
  //
  // Methods
  //

  hasLocationServicesEnabled(): Promise<{ result: boolean }>;

  hasBluetoothEnabled(): Promise<{ result: boolean }>;

  getMonitoredRegions(): Promise<{ result: NotificareRegion[] }>;

  getEnteredRegions(): Promise<{ result: NotificareRegion[] }>;

  enableLocationUpdates(): Promise<void>;

  disableLocationUpdates(): Promise<void>;

  //
  // Permission utilities
  //

  checkPermissionStatus(options: { permission: PermissionGroup }): Promise<{ result: PermissionStatus }>;

  shouldShowPermissionRationale(options: { permission: PermissionGroup }): Promise<{ result: boolean }>;

  presentPermissionRationale(options: { permission: PermissionGroup; rationale: PermissionRationale }): Promise<void>;

  requestPermission(options: { permission: PermissionGroup }): Promise<{ result: PermissionStatus }>;

  openAppSettings(): Promise<void>;

  //
  // Event bridge
  //

  addListener(
    eventName: string,
    listenerFunc: (data: any) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle;
}
