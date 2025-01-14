import type { NotificareDevice } from './models/notificare-device';
import type { NotificareDoNotDisturb } from './models/notificare-do-not-disturb';
import { _Notificare } from './plugin';

export class NotificareDeviceModule {
  /**
   * @returns {Promise<NotificareDevice | null>} - A promise that resolves to
   * the current {@link NotificareDevice} information, or 'null' in case no
   * device is registered.
   */
  public async getCurrentDevice(): Promise<NotificareDevice | null> {
    const { result } = await _Notificare.getCurrentDevice();
    return result;
  }

  /**
   * @returns {Promise<string | null>} - A promise that resolves to the
   * preferred language of the current device for notifications and messages, or
   * `null` if no preferred language is set.
   */
  public async getPreferredLanguage(): Promise<string | null> {
    const { result } = await _Notificare.getPreferredLanguage();
    return result;
  }

  /**
   * Updates the preferred language setting for the device.
   *
   * @param {string | null} language - The preferred language code.
   * @returns {Promise<void>} - A promise that resolves when the preferred language
   * has been successfully updated.
   */
  public async updatePreferredLanguage(language: string | null): Promise<void> {
    await _Notificare.updatePreferredLanguage({ language });
  }

  /**
   * Registers a user for the device.
   *
   * To register the device anonymously, set both `userId` and `userName` to `null`.
   *
   * @param {string | null} userId - Optional user identifier.
   * @param {string | null} userName - Optional username.
   * @returns {Promise<void>} - A promise that resolves when the user has been
   * successfully registered.
   *
   * @deprecated Use updateUser() instead.
   */
  public async register(userId: string | null, userName: string | null): Promise<void> {
    await _Notificare.register({ userId, userName });
  }

  /**
   * Updates the user information for the device.
   *
   * To register the device anonymously, set both `userId` and `userName` to `null`.
   *
   * @param {string | null} userId - Optional user identifier.
   * @param {string | null} userName - Optional username.
   * @returns {Promise<void>} - A promise that resolves when the user information
   * has been successfully updated.
   */
  public async updateUser(userId: string | null, userName: string | null): Promise<void> {
    await _Notificare.updateUser({ userId, userName });
  }

  /**
   * Fetches the tags associated with the device.
   *
   * @return {Promise<string[]>} - A promise that resolves to a list of tags
   * currently associated with the device.
   */
  public async fetchTags(): Promise<string[]> {
    const { result } = await _Notificare.fetchTags();
    return result;
  }

  /**
   * Adds a single tag to the device.
   *
   * @param {string} tag - The tag to add.
   * @returns {Promise<void>} - A promise that resolves when the tag has been
   * successfully added to the device.
   */
  public async addTag(tag: string): Promise<void> {
    await _Notificare.addTag({ tag });
  }

  /**
   * Adds multiple tags to the device.
   *
   * @param {string[]} tags - A list of tags to add.
   * @returns {Promise<void>} - A promise that resolves when all the tags have
   * been successfully added to the device.
   */
  public async addTags(tags: string[]): Promise<void> {
    await _Notificare.addTags({ tags });
  }

  /**
   * Removes a specific tag from the device.
   *
   * @param {string} tag - The tag to remove.
   * @returns {Promise<void>} - A promise that resolves when the tag has been
   * successfully removed from the device.
   */
  public async removeTag(tag: string): Promise<void> {
    await _Notificare.removeTag({ tag });
  }

  /**
   * Removes multiple tags from the device.
   *
   * @param {string[]} tags - A list of tags to remove.
   * @returns {Promise<void>} - A promise that resolves when all the specified tags
   * have been successfully removed from the device.
   */
  public async removeTags(tags: string[]): Promise<void> {
    await _Notificare.removeTags({ tags });
  }

  /**
   * Clears all tags from the device.
   *
   * @returns {Promise<void>} - A promise that resolves when all tags have been
   * successfully cleared from the device.
   */
  public async clearTags(): Promise<void> {
    await _Notificare.clearTags();
  }

  /**
   * Fetches the "Do Not Disturb" (DND) settings for the device.
   *
   * @return {Promise<NotificareDoNotDisturb | null>} - A promise that resolves
   * to the current {@link NotificareDoNotDisturb} settings, or `null` if
   * none are set.
   */
  public async fetchDoNotDisturb(): Promise<NotificareDoNotDisturb | null> {
    const { result } = await _Notificare.fetchDoNotDisturb();
    return result;
  }

  /**
   * Updates the "Do Not Disturb" (DND) settings for the device.
   *
   * @param {NotificareDoNotDisturb} dnd - The new {@link NotificareDoNotDisturb}
   * settings to apply.
   * @returns {Promise<void>} - A promise that resolves when the DND settings
   * have been successfully updated.
   */
  public async updateDoNotDisturb(dnd: NotificareDoNotDisturb): Promise<void> {
    await _Notificare.updateDoNotDisturb({ dnd });
  }

  /**
   * Clears the "Do Not Disturb" (DND) settings for the device.
   *
   * @returns {Promise<void>} - A promise that resolves when the DND settings
   * have been successfully cleared.
   */
  public async clearDoNotDisturb(): Promise<void> {
    await _Notificare.clearDoNotDisturb();
  }

  /**
   * Fetches the user data associated with the device.
   *
   * @return {Promise<Record<string, string>>} - A promise that resolves to a
   * {@link Record} object containing the current user data.
   */
  public async fetchUserData(): Promise<Record<string, string>> {
    const { result } = await _Notificare.fetchUserData();
    return result;
  }

  /**
   * Updates the custom user data associated with the device.
   *
   * @param {Record<string, string>} userData - The updated user data to associate
   * with the device.
   * @returns {Promise<void>} - A promise that resolves when the user data has
   * been successfully updated.
   */
  public async updateUserData(userData: Record<string, string>): Promise<void> {
    await _Notificare.updateUserData({ userData });
  }
}
