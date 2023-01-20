import { WebPlugin } from '@capacitor/core';

import type { NotificareInAppMessagingPlugin } from './plugin';

export class NotificareInAppMessagingPluginWeb extends WebPlugin implements NotificareInAppMessagingPlugin {
  hasMessagesSuppressed(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setMessagesSuppressed(_options: { suppressed: boolean; evaluateContext?: boolean }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}
