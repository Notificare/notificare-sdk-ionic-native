import type { NotificareNotification } from 'capacitor-notificare';

export interface NotificareScannable {
  readonly id: string;
  readonly name: string;
  readonly tag: string;
  readonly type: string;
  readonly notification?: NotificareNotification;
}
