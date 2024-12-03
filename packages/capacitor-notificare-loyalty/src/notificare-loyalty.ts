import type { NotificarePass } from './models/notificare-pass';
import { NativePlugin } from './plugin';

export class NotificareLoyalty {
  //
  // Methods
  //

  /**
   * Fetches a pass by its serial number.
   *
   * @param serial The serial number of the pass to be fetched.
   * @return The fetched {@link NotificarePass} corresponding to the given serial
   * number.
   */
  public static async fetchPassBySerial(serial: string): Promise<NotificarePass> {
    const { result } = await NativePlugin.fetchPassBySerial({ serial });
    return result;
  }

  /**
   * Fetches a pass by its barcode.
   *
   * @param barcode The barcode of the pass to be fetched.
   * @return The fetched {@link NotificarePass} corresponding to the given
   * barcode.
   */
  public static async fetchPassByBarcode(barcode: string): Promise<NotificarePass> {
    const { result } = await NativePlugin.fetchPassByBarcode({ barcode });
    return result;
  }

  /**
   * Presents a pass to the user.
   *
   * @param pass The {@link NotificarePass} to be presented to the user.
   */
  public static async present(pass: NotificarePass): Promise<void> {
    await NativePlugin.present({ pass });
  }
}
