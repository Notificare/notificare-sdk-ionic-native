import type { PluginListenerHandle } from '@capacitor/core';
import type { NotificareNotification, NotificareNotificationAction } from 'capacitor-notificare';

import { NativePlugin } from './plugin';

export class NotificarePushUI {
  //
  // Methods
  //

  /**
   * Presents a notification to the user.
   *
   * This method launches the UI for displaying the provided
   * {@link NotificareNotification}.
   *
   * @param notification The {@link NotificareNotification} to present.
   */
  public static async presentNotification(notification: NotificareNotification): Promise<void> {
    await NativePlugin.presentNotification({ notification });
  }

  /**
   * Presents an action associated with a notification.
   *
   * This method presents the UI for executing a specific
   * {@link NotificareNotificationAction} associated with the provided
   * {@link NotificareNotification}.
   *
   * @param notification The {@link NotificareNotification} to present.
   * @param action The {@link NotificareNotificationAction} to execute.
   */
  public static async presentAction(
    notification: NotificareNotification,
    action: NotificareNotificationAction
  ): Promise<void> {
    await NativePlugin.presentAction({ notification, action });
  }

  //
  // Events
  //

  /**
   * Called when a notification is about to be presented.
   *
   * This method is invoked before the notification is shown to the user.
   *
   * @param callback A callback that will be invoked with the result of the
   * onNotificationWillPresent event. It will provide the
   * {@link NotificareNotification} that will be presented.
   */
  static async onNotificationWillPresent(
    callback: (notification: NotificareNotification) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_will_present', callback);
  }

  /**
   * Called when a notification has been presented.
   *
   * This method is triggered when the notification has been shown to the user.
   *
   * @param callback A callback that will be invoked with the result of the
   * onNotificationPresented event. It will provide the
   * {@link NotificareNotification} that was presented.
   */
  static async onNotificationPresented(
    callback: (notification: NotificareNotification) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_presented', callback);
  }

  /**
   * Called when the presentation of a notification has finished.
   *
   * This method is invoked after the notification UI has been dismissed or the
   * notification interaction has completed.
   *
   * @param callback A callback that will be invoked with the result of the
   * onNotificationFinishedPresenting event. It will provide the
   * {@link NotificareNotification} that finished presenting.
   */
  static async onNotificationFinishedPresenting(
    callback: (notification: NotificareNotification) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_finished_presenting', callback);
  }

  /**
   * Called when a notification fails to present.
   *
   * This method is invoked if there is an error preventing the notification from
   * being presented.
   *
   * @param callback A callback that will be invoked with the result of the
   * onNotificationFailedToPresent event. It will provide the
   * {@link NotificareNotification} that failed to present.
   */
  static async onNotificationFailedToPresent(
    callback: (notification: NotificareNotification) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_failed_to_present', callback);
  }

  /**
   * Called when a URL within a notification is clicked.
   *
   * This method is triggered when the user clicks a URL in the notification.
   *
   * @param callback A callback that will be invoked with the result of the
   * onNotificationUrlClicked event. It will provide the string URL and the
   * {@link NotificareNotification} containing it.
   */
  static async onNotificationUrlClicked(
    callback: (data: { notification: NotificareNotification; url: string }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('notification_url_clicked', callback);
  }

  /**
   * Called when an action associated with a notification is about to execute.
   *
   * This method is invoked right before the action associated with a notification
   * is executed.
   *
   * @param callback A callback that will be invoked with the result of the
   * onActionWillExecute event. It will provide the
   * {@link NotificareNotificationAction} that will be executed and the
   * {@link NotificareNotification} containing it.
   */
  static async onActionWillExecute(
    callback: (data: { notification: NotificareNotification; action: NotificareNotificationAction }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_will_execute', callback);
  }

  /**
   * Called when an action associated with a notification has been executed.
   *
   * This method is triggered after the action associated with the notification
   * has been successfully executed.
   *
   * @param callback A callback that will be invoked with the result of the
   * onActionExecuted event. It will provide the
   * {@link NotificareNotificationAction} that was executed and the
   * {@link NotificareNotification} containing it.
   */
  static async onActionExecuted(
    callback: (data: { notification: NotificareNotification; action: NotificareNotificationAction }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_executed', callback);
  }

  /**
   * Called when an action associated with a notification is available but has
   * not been executed by the user.
   *
   * This method is triggered after the action associated with the notification
   * has not been executed, caused by user interaction.
   *
   * @param callback A callback that will be invoked with the result of the
   * onActionNotExecuted event. It will provide the
   * {@link NotificareNotificationAction} that was not executed and the
   * {@link NotificareNotification} containing it.
   */
  static async onActionNotExecuted(
    callback: (data: { notification: NotificareNotification; action: NotificareNotificationAction }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_not_executed', callback);
  }

  /**
   * Called when an action associated with a notification fails to execute.
   *
   * This method is triggered if an error occurs while trying to execute an
   * action associated with the notification.
   *
   * @param callback A callback that will be invoked with the result of the
   * onActionFailedToExecute event. It will provide the
   * {@link NotificareNotificationAction} that was failed to execute and the
   * {@link NotificareNotification} containing it. It may also provide the error
   * that caused the failure.
   */
  static async onActionFailedToExecute(
    callback: (data: {
      notification: NotificareNotification;
      action: NotificareNotificationAction;
      error?: string;
    }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_failed_to_execute', callback);
  }

  /**
   * Called when a custom action associated with a notification is received.
   *
   * This method is triggered when a custom action associated with the
   * notification is received, such as a deep link or custom URL scheme.
   *
   * @param callback A callback that will be invoked with the result of the
   * onCustomActionReceived event. It will provide the
   * {@link NotificareNotificationAction} that triggered the custom action and
   * the {@link NotificareNotification} containing it. It also provides the URL
   * representing the custom action.
   */
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
