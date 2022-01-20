import { registerPlugin } from '@capacitor/core';

import type { NotificareGeoPlugin } from './definitions';

const NotificareGeo = registerPlugin<NotificareGeoPlugin>('NotificareGeoPlugin', {
  web: () => import('./web').then((m) => new m.NotificareGeoPluginWeb()),
});

export * from './definitions';
export { NotificareGeo };
