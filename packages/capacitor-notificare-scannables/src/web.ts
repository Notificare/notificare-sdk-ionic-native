import { WebPlugin } from '@capacitor/core';

import type { NotificareScannable } from './models/notificare-scannable';
import type { NotificareScannablesPlugin } from './plugin';

export class NotificareScannablesPluginWeb extends WebPlugin implements NotificareScannablesPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canStartNfcScannableSession(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startScannableSession(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startNfcScannableSession(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startQrCodeScannableSession(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetch(_options: { tag: string }): Promise<{ result: NotificareScannable }> {
    throw this.unimplemented('Not implemented on web.');
  }
}
