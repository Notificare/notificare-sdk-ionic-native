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

  public static async setMessagesSuppressed(suppressed: boolean): Promise<void> {
    await NativePlugin.setMessagesSuppressed({ suppressed });
  }

  //
  // Events
  //

  public static onMessagePresented(
    callback: (message: NotificareInAppMessage) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('message_presented', ({ message }) => callback(message));
  }

  public static onMessageFinishedPresenting(
    callback: (message: NotificareInAppMessage) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('message_finished_presenting', ({ message }) => callback(message));
  }

  public static onMessageFailedToPresent(
    callback: (message: NotificareInAppMessage) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('message_failed_to_present', ({ message }) => callback(message));
  }

  public static onActionExecuted(
    callback: (data: { message: NotificareInAppMessage; action: NotificareInAppMessageAction }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('action_executed', callback);
  }

  public static onActionFailedToExecute(
    callback: (data: { message: NotificareInAppMessage; action: NotificareInAppMessageAction; error?: string }) => void
  ): Promise<PluginListenerHandle> & PluginListenerHandle {
    return NativePlugin.addListener('action_failed_to_execute', callback);
  }
}
