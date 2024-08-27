import type { PluginListenerHandle } from '@capacitor/core';
import type { NotificareNotification, NotificareNotificationAction } from 'capacitor-notificare';

import { NativePlugin } from './plugin';

export class NotificarePushUI {
  //
  // Methods
  //

  public static async presentNotification(notification: NotificareNotification): Promise<void> {
    await NativePlugin.presentNotification({ notification });
  }

  public static async presentAction(
    notification: NotificareNotification,
    action: NotificareNotificationAction
  ): Promise<void> {
    await NativePlugin.presentAction({ notification, action });
  }

  //
  // Events
  //

  static async onNotificationWillPresent(
    callback: (notification: NotificareNotification) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_will_present', callback);
  }

  static async onNotificationPresented(
    callback: (notification: NotificareNotification) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_presented', callback);
  }

  static async onNotificationFinishedPresenting(
    callback: (notification: NotificareNotification) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_finished_presenting', callback);
  }

  static async onNotificationFailedToPresent(
    callback: (notification: NotificareNotification) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_failed_to_present', callback);
  }

  static async onNotificationUrlClicked(
    callback: (data: { notification: NotificareNotification; url: string }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_url_clicked', callback);
  }

  static async onActionWillExecute(
    callback: (data: { notification: NotificareNotification; action: NotificareNotificationAction }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_will_execute', callback);
  }

  static async onActionExecuted(
    callback: (data: { notification: NotificareNotification; action: NotificareNotificationAction }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_executed', callback);
  }

  static async onActionNotExecuted(
    callback: (data: { notification: NotificareNotification; action: NotificareNotificationAction }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_not_executed', callback);
  }

  static async onActionFailedToExecute(
    callback: (data: {
      notification: NotificareNotification;
      action: NotificareNotificationAction;
      error?: string;
    }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_failed_to_execute', callback);
  }

  static async onCustomActionReceived(
    callback: (data: {
      notification: NotificareNotification;
      action: NotificareNotificationAction;
      url: string;
    }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('custom_action_received', callback);
  }
}
