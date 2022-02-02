import { WebPlugin } from '@capacitor/core';

import type { NotificarePushPlugin } from './plugin';

export class NotificarePushPluginWeb extends WebPlugin implements NotificarePushPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAuthorizationOptions(_options: { options: string[] }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCategoryOptions(_options: { options: string[] }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setPresentationOptions(_options: { options: string[] }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasRemoteNotificationsEnabled(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allowedUI(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enableRemoteNotifications(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disableRemoteNotifications(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}
