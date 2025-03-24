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

  /**
   * Indicates whether location services are enabled.
   *
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the
   * location services are enabled by the application, and `false` otherwise.
   */
  public static async hasLocationServicesEnabled(): Promise<boolean> {
    const { result } = await NativePlugin.hasLocationServicesEnabled();
    return result;
  }

  /**
   * Indicates whether Bluetooth is enabled.
   *
   * @returns {Promise<boolean>} - A promise that resolves to `true` if Bluetooth
   * is enabled and available for beacon detection and ranging, and `false` otherwise.
   */
  public static async hasBluetoothEnabled(): Promise<boolean> {
    const { result } = await NativePlugin.hasBluetoothEnabled();
    return result;
  }

  /**
   * Provides a list of regions currently being monitored.
   *
   * @returns {Promise<NotificareRegion[]>} - A promise that resolves to  a list
   * of {@link NotificareRegion} objects representing the geographical regions
   * being actively monitored for entry and exit events.
   */
  public static async getMonitoredRegions(): Promise<NotificareRegion[]> {
    const { result } = await NativePlugin.getMonitoredRegions();
    return result;
  }

  /**
   * Provides a list of regions the user has entered.
   *
   * @returns {Promise<NotificareRegion[]>} - A promise that resolves to a list
   * of {@link NotificareRegion} objects representing the regions that the user
   * has entered and not yet exited.
   */
  public static async getEnteredRegions(): Promise<NotificareRegion[]> {
    const { result } = await NativePlugin.getEnteredRegions();
    return result;
  }

  /**
   * Enables location updates, activating location tracking, region monitoring,
   * and beacon detection.
   *
   * **Note**: This function requires explicit location permissions from the user.
   * Starting with Android 10 (API level 29), background location access requires
   * the ACCESS_BACKGROUND_LOCATION permission. For beacon detection, Bluetooth
   * permissions are also necessary. Ensure all permissions are requested before
   * invoking this method.
   *
   * The behavior varies based on granted permissions:
   * - **Permission denied**: Clears the device's location information.
   * - **When In Use permission granted**: Tracks location only while the
   * app is in use.
   * - **Always permission granted**: Enables geofencing capabilities.
   * - **Always + Bluetooth permissions granted**: Enables geofencing
   * and beacon detection.
   *
   * @returns {Promise<void>} - A promise that resolves when location updates
   * have been successfully enabled.
   */
  public static async enableLocationUpdates(): Promise<void> {
    await NativePlugin.enableLocationUpdates();
  }

  /**
   * Disables location updates.
   *
   * This method stops receiving location updates, monitoring regions, and
   * detecting nearby beacons.
   *
   * @returns {Promise<void>} - A promise that resolves when location updates
   * have been successfully disabled.
   */
  public static async disableLocationUpdates(): Promise<void> {
    await NativePlugin.disableLocationUpdates();
  }

  //
  // Permission utilities
  //

  /**
   * Checks the current status of a specific permission.
   *
   * @param {PermissionGroup} permission - The {@link PermissionGroup} to
   * check the status for.
   * @returns {Promise<PermissionStatus>} - A promise that resolves to a
   * {@link PermissionStatus} enum containing the given permission status.
   */
  public static async checkPermissionStatus(permission: PermissionGroup): Promise<PermissionStatus> {
    const { result } = await NativePlugin.checkPermissionStatus({ permission });
    return result;
  }

  /**
   * Determines if the app should display a rationale for requesting the specified permission.
   *
   * This method is Android focused and will therefore always resolve to `false`
   * for iOS.
   *
   * @param {PermissionGroup} permission - The {@link PermissionGroup} to evaluate
   * if a permission rationale is needed.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if a rationale
   * should be shown, or `false` otherwise.
   */
  public static async shouldShowPermissionRationale(permission: PermissionGroup): Promise<boolean> {
    const { result } = await NativePlugin.shouldShowPermissionRationale({ permission });
    return result;
  }

  /**
   * Presents a rationale to the user for requesting a specific permission.
   *
   * This method is Android focused, and should only be used after the {@link shouldShowPermissionRationale()}
   * conditional method to ensure correct behaviour on both platforms.
   *
   * This method displays a custom rationale message to the user, explaining why the app requires
   * the specified permission. The rationale should be presented prior to initiating the permission
   * request if a rationale is deemed necessary.
   *
   * @param {PermissionGroup} permission - The {@link PermissionGroup} being requested.
   * @param {PermissionRationale }rationale - The {@link PermissionRationale} details,
   * including the title and message to present to the user.
   * @returns {Promise<void>} - A promise that resolves once the rationale has been
   * successfully dismissed by the user.
   */
  public static async presentPermissionRationale(
    permission: PermissionGroup,
    rationale: PermissionRationale
  ): Promise<void> {
    await NativePlugin.presentPermissionRationale({ permission, rationale });
  }

  /**
   * Requests a specific permission from the user.
   *
   * This method prompts the user to grant or deny the specified permission. The returned status
   * indicates the result of the user's decision, which can be one of several states such as
   * "granted", "denied", "restricted", or "permanently_denied".
   *
   * @param {PermissionGroup} permission - The {@link PermissionGroup} being requested.
   * @returns {Promise<PermissionStatus>} - A promise that resolves to a {@link PermissionStatus}
   * enum containing the requested permission status.
   */
  public static async requestPermission(permission: PermissionGroup): Promise<PermissionStatus> {
    const { result } = await NativePlugin.requestPermission({ permission });
    return result;
  }

  /**
   *  Opens the application's settings page.
   *
   *  @returns {Promise<void>} - A promise that resolves when the application
   *  settings page has been successfully opened.
   */
  public static async openAppSettings(): Promise<void> {
    await NativePlugin.openAppSettings();
  }

  //
  // Events
  //

  /**
   * Called when a new location update is received.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onLocationUpdated event. It will provide the updated {@link NotificareLocation}
   * object representing the user's new location.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onLocationUpdated event.
   */
  public static async onLocationUpdated(
    callback: (location: NotificareLocation) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('location_updated', callback);
  }

  /**
   * Called when the user enters a monitored region.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onRegionEntered event. It will provide the {@link NotificareRegion}
   * representing the region the user has entered.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onRegionEntered event.
   */
  public static async onRegionEntered(callback: (region: NotificareRegion) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('region_entered', callback);
  }

  /**
   * Called when the user exits a monitored region.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onRegionExited event. It will provide the {@link NotificareRegion}
   * representing the region the user has exited.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onRegionExited event.
   */
  public static async onRegionExited(callback: (region: NotificareRegion) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('region_exited', callback);
  }

  /**
   * Called when the user enters the proximity of a beacon.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onBeaconEntered event. It will provide the {@link NotificareBeacon}
   * representing the beacon the user has entered the proximity of.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onBeaconEntered event.
   */
  public static async onBeaconEntered(callback: (beacon: NotificareBeacon) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('beacon_entered', callback);
  }

  /**
   * Called when the user exits the proximity of a beacon.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onBeaconExited event. It will provide the {@link NotificareBeacon}
   * representing the beacon the user has exited the proximity of.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onBeaconExited event.
   */
  public static async onBeaconExited(callback: (beacon: NotificareBeacon) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('beacon_exited', callback);
  }

  /**
   * Called when beacons are ranged in a monitored region.
   *
   * This method provides the list of beacons currently detected within the given
   * region.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onBeaconsRanged event. It will provide a list of {@link NotificareBeacon}
   * that were detected and the {@link NotificareRegion} where they were detected.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onBeaconsRanged event.
   */
  public static async onBeaconsRanged(
    callback: (data: { region: NotificareRegion; beacons: NotificareBeacon[] }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('beacons_ranged', callback);
  }

  /**
   * Called when the device registers a location visit.
   *
   * **Note**: This method is only supported on iOS.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onVisit event. It will provide a {@link NotificareVisit} object representing
   * the details of the visit.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onVisit event.
   */
  public static async onVisit(callback: (visit: NotificareVisit) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('visit', callback);
  }

  /**
   * Called when there is an update to the device’s heading.
   *
   * **Note**: This method is only supported on iOS.
   *
   * @param callback - A callback that will be invoked with the result of the
   * onHeadingUpdated event. It will provide a {@link NotificareHeading} object
   * containing the details of the updated heading.
   * @returns {Promise<PluginListenerHandle>} - A promise that resolves to a
   * {@link PluginListenerHandle} for the onHeadingUpdated event.
   */
  public static async onHeadingUpdated(callback: (heading: NotificareHeading) => void): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('heading_updated', callback);
  }
}

export interface PermissionRationale {
  title?: string;
  message: string;
  buttonText?: string;
}
