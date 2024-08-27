import type { PluginListenerHandle } from '@capacitor/core';
import type { NotificareNotification, NotificareNotificationAction } from 'capacitor-notificare';

import type { PushPermissionStatus } from './enums';
import type { NotificareNotificationDeliveryMechanism } from './models/notificare-notification-delivery-mechanism';
import type { NotificarePushSubscription } from './models/notificare-push-subscription';
import type { NotificareSystemNotification } from './models/notificare-system-notification';
import type { NotificareTransport } from './models/notificare-transport';
import { NativePlugin } from './plugin';

export class NotificarePush {
  //
  // Methods
  //

  public static async setAuthorizationOptions(options: string[]): Promise<void> {
    await NativePlugin.setAuthorizationOptions({ options });
  }

  public static async setCategoryOptions(options: string[]): Promise<void> {
    await NativePlugin.setCategoryOptions({ options });
  }

  public static async setPresentationOptions(options: string[]): Promise<void> {
    await NativePlugin.setPresentationOptions({ options });
  }

  public static async hasRemoteNotificationsEnabled(): Promise<boolean> {
    const { result } = await NativePlugin.hasRemoteNotificationsEnabled();
    return result;
  }

  public static async getTransport(): Promise<NotificareTransport | null> {
    const { result } = await NativePlugin.getTransport();
    return result;
  }

  public static async getSubscription(): Promise<NotificarePushSubscription | null> {
    const { result } = await NativePlugin.getSubscription();
    return result;
  }

  public static async allowedUI(): Promise<boolean> {
    const { result } = await NativePlugin.allowedUI();
    return result;
  }

  public static async enableRemoteNotifications(): Promise<void> {
    await NativePlugin.enableRemoteNotifications();
  }

  public static async disableRemoteNotifications(): Promise<void> {
    await NativePlugin.disableRemoteNotifications();
  }

  //
  // Permission utilities
  //

  public static async checkPermissionStatus(): Promise<PushPermissionStatus> {
    const { result } = await NativePlugin.checkPermissionStatus();
    return result;
  }

  public static async shouldShowPermissionRationale(): Promise<boolean> {
    const { result } = await NativePlugin.shouldShowPermissionRationale();
    return result;
  }

  public static async presentPermissionRationale(rationale: PushPermissionRationale): Promise<void> {
    await NativePlugin.presentPermissionRationale({ rationale });
  }

  public static async requestPermission(): Promise<PushPermissionStatus> {
    const { result } = await NativePlugin.requestPermission();
    return result;
  }

  public static async openAppSettings(): Promise<void> {
    await NativePlugin.openAppSettings();
  }

  //
  // Events
  //

  public static async onNotificationInfoReceived(
    callback: (data: {
      notification: NotificareNotification;
      deliveryMechanism: NotificareNotificationDeliveryMechanism;
    }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_info_received', callback);
  }

  public static async onSystemNotificationReceived(
    callback: (notification: NotificareSystemNotification) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('system_notification_received', callback);
  }

  public static async onUnknownNotificationReceived(
    callback: (notification: Record<string, any>) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('unknown_notification_received', callback);
  }

  public static async onNotificationOpened(
    callback: (notification: NotificareNotification) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_opened', callback);
  }

  public static async onUnknownNotificationOpened(
    callback: (notification: Record<string, any>) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('unknown_notification_opened', callback);
  }

  public static async onNotificationActionOpened(
    callback: (data: { notification: NotificareNotification; action: NotificareNotificationAction }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_action_opened', callback);
  }

  public static async onUnknownNotificationActionOpened(
    callback: (data: { notification: Record<string, any>; action: string; responseText?: string }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('unknown_notification_action_opened', callback);
  }

  public static async onNotificationSettingsChanged(
    callback: (granted: boolean) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_settings_changed', ({ granted }) => callback(granted));
  }

  public static async onSubscriptionChanged(
    callback: (subscription: NotificarePushSubscription | undefined) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('subscription_changed', callback);
  }

  public static async onShouldOpenNotificationSettings(
    callback: (notification: NotificareNotification | null) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('should_open_notification_settings', callback);
  }

  public static async onFailedToRegisterForRemoteNotifications(
    callback: (error: string) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('failed_to_register_for_remote_notifications', ({ error }) =>
      callback(error)
    );
  }
}

export interface PushPermissionRationale {
  title?: string;
  message: string;
  buttonText?: string;
}
