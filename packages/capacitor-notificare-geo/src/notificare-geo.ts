import type { PluginListenerHandle } from '@capacitor/core';

import type { PermissionGroup, PermissionStatus } from './enums';
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

  public static async getMonitoredRegions(): Promise<NotificareRegion[]> {
    const { result } = await NativePlugin.getMonitoredRegions();
    return result;
  }

  public static async getEnteredRegions(): Promise<NotificareRegion[]> {
    const { result } = await NativePlugin.getEnteredRegions();
    return result;
  }

  public static async enableLocationUpdates(): Promise<void> {
    await NativePlugin.enableLocationUpdates();
  }

  public static async disableLocationUpdates(): Promise<void> {
    await NativePlugin.disableLocationUpdates();
  }

  //
  // Permission utilities
  //

  public static async checkPermissionStatus(permission: PermissionGroup): Promise<PermissionStatus> {
    const { result } = await NativePlugin.checkPermissionStatus({ permission });
    return result;
  }

  public static async shouldShowPermissionRationale(permission: PermissionGroup): Promise<boolean> {
    const { result } = await NativePlugin.shouldShowPermissionRationale({ permission });
    return result;
  }

  public static async presentPermissionRationale(
    permission: PermissionGroup,
    rationale: PermissionRationale
  ): Promise<void> {
    await NativePlugin.presentPermissionRationale({ permission, rationale });
  }

  public static async requestPermission(permission: PermissionGroup): Promise<PermissionStatus> {
    const { result } = await NativePlugin.requestPermission({ permission });
    return result;
  }

  public static async openAppSettings(): Promise<void> {
    await NativePlugin.openAppSettings();
  }

  //
  // Events
  //

  public static async onLocationUpdated(
    callback: (location: NotificareLocation) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('location_updated', callback);
  }

  public static async onRegionEntered(callback: (region: NotificareRegion) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('region_entered', callback);
  }

  public static async onRegionExited(callback: (region: NotificareRegion) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('region_exited', callback);
  }

  public static async onBeaconEntered(callback: (beacon: NotificareBeacon) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('beacon_entered', callback);
  }

  public static async onBeaconExited(callback: (beacon: NotificareBeacon) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('beacon_exited', callback);
  }

  public static async onBeaconsRanged(
    callback: (data: { region: NotificareRegion; beacons: NotificareBeacon[] }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('beacons_ranged', callback);
  }

  public static async onVisit(callback: (visit: NotificareVisit) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('visit', callback);
  }

  public static async onHeadingUpdated(callback: (heading: NotificareHeading) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('heading_updated', callback);
  }
}

export interface PermissionRationale {
  title?: string;
  message: string;
  buttonText?: string;
}
