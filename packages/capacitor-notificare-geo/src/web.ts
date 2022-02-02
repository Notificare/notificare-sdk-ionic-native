import { WebPlugin } from '@capacitor/core';

import type { NotificareGeoPlugin } from './plugin';

export class NotificareGeoPluginWeb extends WebPlugin implements NotificareGeoPlugin {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasLocationServicesEnabled(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasBluetoothEnabled(): Promise<{ result: boolean }> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enableLocationUpdates(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  disableLocationUpdates(): Promise<void> {
    throw this.unimplemented('Not implemented on web.');
  }
}
