import { registerPlugin } from '@capacitor/core';

import type { NotificareAssetsPlugin } from './definitions';

const NotificareAssets = registerPlugin<NotificareAssetsPlugin>('NotificareAssetsPlugin', {
  web: () => import('./web').then((m) => new m.NotificareAssetsPluginWeb()),
});

export * from './definitions';
export { NotificareAssets };
