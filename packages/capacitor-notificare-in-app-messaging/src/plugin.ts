import type { PluginListenerHandle } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';

export const NativePlugin = registerPlugin<NotificareInAppMessagingPlugin>('NotificareInAppMessagingPlugin', {
  web: () => import('./web').then((m) => new m.NotificareInAppMessagingPluginWeb()),
});

export interface NotificareInAppMessagingPlugin {
  //
  // Methods
  //

  hasMessagesSuppressed(): Promise<{ result: boolean }>;

  setMessagesSuppressed(options: { suppressed: boolean; evaluateContext?: boolean }): Promise<void>;

  //
  // Event bridge
  //

  addListener(eventName: string, listenerFunc: (data: any) => void): Promise<PluginListenerHandle>;
}
