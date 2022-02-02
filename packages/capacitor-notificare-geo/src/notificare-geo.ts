import type { PluginListenerHandle } from '@capacitor/core';

import type { NotificareBeacon } from './models/notificare-beacon';
import type { NotificareHeading } from './models/notificare-heading';
import type { NotificareLocation } from './models/notificare-location';
import type { NotificareRegion } from './models/notificare-region';
import type { NotificareVisit } from './models/notificare-visit';
import { NativePlugin } from './plugin';

export class NotificareGeo {
  //
  // Methods
  //

  public static async hasLocationServicesEnabled(): Promise<boolean> {
    const { result } = await NativePlugin.hasLocationServicesEnabled();
    return result;
  }

  public static async hasBluetoothEnabled(): Promise<boolean> {
    const { result } = await NativePlugin.hasBluetoothEnabled();
    return result;
  }

  public static async enableLocationUpdates(): Promise<void> {
    await NativePlugin.enableLocationUpdates();
  }

  public static async disableLocationUpdates(): Promise<void> {
    await NativePlugin.disableLocationUpdates();
  }

  //
  // Events
  //

  public static onLocationUpdated(
    callback: (location: NotificareLocation) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('location_updated', callback);
  }

  public static onRegionEntered(
    callback: (region: NotificareRegion) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('region_entered', callback);
  }

  public static onRegionExited(
    callback: (region: NotificareRegion) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('region_exited', callback);
  }

  public static onBeaconEntered(
    callback: (beacon: NotificareBeacon) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('beacon_entered', callback);
  }

  public static onBeaconExited(
    callback: (beacon: NotificareBeacon) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('beacon_exited', callback);
  }

  public static onBeaconsRanged(
    callback: (data: { region: NotificareRegion; beacons: NotificareBeacon[] }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('beacons_ranged', callback);
  }

  public static onVisit(
    callback: (visit: NotificareVisit) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('visit', callback);
  }

  public static onHeadingUpdated(
    callback: (heading: NotificareHeading) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('heading_updated', callback);
  }
}
