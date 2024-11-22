import type { PluginListenerHandle } from '@capacitor/core';

import type { NotificareInAppMessage, NotificareInAppMessageAction } from './models/notificare-in-app-message';
import { NativePlugin } from './plugin';

export class NotificareInAppMessaging {
  //
  // Methods
  //

  /**
   * Indicates whether in-app messages are currently suppressed.
   *
   * @returns `true` if message dispatching and the presentation of in-app
   * messages are temporarily suppressed and `false` if in-app messages are
   * allowed to be presented.
   */
  public static async hasMessagesSuppressed(): Promise<boolean> {
    const { result } = await NativePlugin.hasMessagesSuppressed();
    return result;
  }

  /**
   * Sets the message suppression state.
   *
   * When messages are suppressed, in-app messages will not be presented to the
   * user. By default, stopping the in-app message suppression does not
   * re-evaluate the foreground context.
   *
   * To trigger a new context evaluation after stopping in-app message
   * suppression, set the `evaluateContext` parameter to `true`.
   *
   * @param suppressed Set to `true` to suppress in-app messages, or `false` to
   * stop suppressing them.
   * @param evaluateContext Set to `true` to re-evaluate the foreground context
   * when stopping in-app message
   * suppression.
   */
  public static async setMessagesSuppressed(suppressed: boolean, evaluateContext?: boolean): Promise<void> {
    await NativePlugin.setMessagesSuppressed({ suppressed, evaluateContext });
  }

  //
  // Events
  //

  /**
   * Called when an in-app message is successfully presented to the user.
   *
   * @param callback A callback that will be invoked with the result of the
   * onMessagePresented event. It will provide the {@link NotificareInAppMessage}
   * that was presented.
   */
  public static async onMessagePresented(
    callback: (message: NotificareInAppMessage) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('message_presented', ({ message }) => callback(message));
  }

  /**
   * Called when the presentation of an in-app message has finished.
   *
   * This method is invoked after the message is no longer visible to the user.
   *
   * @param callback A callback that will be invoked with the result of the
   * onMessageFinishedPresenting event. It will provide the
   * {@link NotificareInAppMessage} that finished presenting.
   */
  public static async onMessageFinishedPresenting(
    callback: (message: NotificareInAppMessage) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('message_finished_presenting', ({ message }) => callback(message));
  }

  /**
   * Called when an in-app message failed to present.
   *
   * @param callback A callback that will be invoked with the result of the
   * onMessageFailedToPresent event. It will provide the
   * {@link NotificareInAppMessage} that failed to present.
   */
  public static async onMessageFailedToPresent(
    callback: (message: NotificareInAppMessage) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('message_failed_to_present', ({ message }) => callback(message));
  }

  /**
   * Called when an action is successfully executed for an in-app message.
   *
   * @param callback A callback that will be invoked with the result of the
   * onActionExecuted event. It will provide the
   * {@link NotificareInAppMessageAction} that was executed and the
   * {@link NotificareInAppMessage} for which the action was executed.
   */
  public static async onActionExecuted(
    callback: (data: { message: NotificareInAppMessage; action: NotificareInAppMessageAction }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_executed', callback);
  }

  /**
   * Called when an action execution failed for an in-app message.
   *
   * This method is triggered when an error occurs while attempting to execute
   * an action.
   *
   * @param callback A callback that will be invoked with the result of the
   * onActionFailedToExecuted event. It will provide the
   * {@link NotificareInAppMessageAction} that failed to execute and the
   * {@link NotificareInAppMessage} for which the action was attempted.
   */
  public static async onActionFailedToExecute(
    callback: (data: { message: NotificareInAppMessage; action: NotificareInAppMessageAction; error?: string }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_failed_to_execute', callback);
  }
}
