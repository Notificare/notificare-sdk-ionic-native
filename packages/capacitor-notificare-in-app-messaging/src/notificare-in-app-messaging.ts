import type { PluginListenerHandle } from '@capacitor/core';

import type { NotificareInAppMessage, NotificareInAppMessageAction } from './models/notificare-in-app-message';
import { NativePlugin } from './plugin';

export class NotificareInAppMessaging {
  //
  // Methods
  //

  public static async hasMessagesSuppressed(): Promise<boolean> {
    const { result } = await NativePlugin.hasMessagesSuppressed();
    return result;
  }

  public static async setMessagesSuppressed(suppressed: boolean, evaluateContext?: boolean): Promise<void> {
    await NativePlugin.setMessagesSuppressed({ suppressed, evaluateContext });
  }

  //
  // Events
  //

  public static async onMessagePresented(
    callback: (message: NotificareInAppMessage) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('message_presented', ({ message }) => callback(message));
  }

  public static async onMessageFinishedPresenting(
    callback: (message: NotificareInAppMessage) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('message_finished_presenting', ({ message }) => callback(message));
  }

  public static async onMessageFailedToPresent(
    callback: (message: NotificareInAppMessage) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('message_failed_to_present', ({ message }) => callback(message));
  }

  public static async onActionExecuted(
    callback: (data: { message: NotificareInAppMessage; action: NotificareInAppMessageAction }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_executed', callback);
  }

  public static async onActionFailedToExecute(
    callback: (data: { message: NotificareInAppMessage; action: NotificareInAppMessageAction; error?: string }) => void
  ): Promise<PluginListenerHandle> {
    return await NativePlugin.addListener('action_failed_to_execute', callback);
  }
}
