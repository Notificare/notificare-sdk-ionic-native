import { WebPlugin } from '@capacitor/core';

import type { PushPermissionStatus } from './enums';
import type { NotificarePushSubscription } from './models/notificare-push-subscription';
import type { NotificareTransport } from './models/notificare-transport';
import type { PushPermissionRationale } from './notificare-push';
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
  getTransport(): Promise<{ result: NotificareTransport | null }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getSubscription(): Promise<{ result: NotificarePushSubscription | null }> {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  checkPermissionStatus(): Promise<{ result: PushPermissionStatus }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  shouldShowPermissionRationale(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  presentPermissionRationale(_options: { rationale: PushPermissionRationale }): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  requestPermission(): Promise<{ result: PushPermissionStatus }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openAppSettings(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}
