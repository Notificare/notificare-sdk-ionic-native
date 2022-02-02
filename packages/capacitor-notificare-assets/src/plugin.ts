import { registerPlugin } from '@capacitor/core';

import type { NotificareAsset } from './models/notificare-asset';

export const NativePlugin = registerPlugin<NotificareAssetsPlugin>('NotificareAssetsPlugin', {
  web: () => import('./web').then((m) => new m.NotificareAssetsPluginWeb()),
});

export interface NotificareAssetsPlugin {
  fetch(options: { group: string }): Promise<{ result: NotificareAsset[] }>;
}
