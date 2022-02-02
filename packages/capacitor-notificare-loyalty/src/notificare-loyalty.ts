import type { NotificarePass } from './models/notificare-pass';
import { NativePlugin } from './plugin';

export class NotificareLoyalty {
  //
  // Methods
  //

  public static async fetchPassBySerial(serial: string): Promise<NotificarePass> {
    const { result } = await NativePlugin.fetchPassBySerial({ serial });
    return result;
  }

  public static async fetchPassByBarcode(barcode: string): Promise<NotificarePass> {
    const { result } = await NativePlugin.fetchPassByBarcode({ barcode });
    return result;
  }

  public static async present(pass: NotificarePass): Promise<void> {
    await NativePlugin.present({ pass });
  }
}
