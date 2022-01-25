import type { NotificareDevice } from './models/notificare-device';
import type { NotificareDoNotDisturb } from './models/notificare-do-not-disturb';
import { _Notificare } from './plugin';

export class NotificareDeviceModule {
  public async getCurrentDevice(): Promise<NotificareDevice | null> {
    const { result } = await _Notificare.device().getCurrentDevice();
    return result;
  }

  public async getPreferredLanguage(): Promise<string | null> {
    const { result } = await _Notificare.device().getPreferredLanguage();
    return result;
  }

  public async updatePreferredLanguage(language: string | null): Promise<void> {
    await _Notificare.device().updatePreferredLanguage({ language });
  }

  public async register(userId: string | null, userName: string | null): Promise<void> {
    await _Notificare.device().register({ userId, userName });
  }

  public async fetchTags(): Promise<string[]> {
    const { result } = await _Notificare.device().fetchTags();
    return result;
  }

  public async addTag(tag: string): Promise<void> {
    await _Notificare.device().addTag({ tag });
  }

  public async addTags(tags: string[]): Promise<void> {
    await _Notificare.device().addTags({ tags });
  }

  public async removeTag(tag: string): Promise<void> {
    await _Notificare.device().removeTag({ tag });
  }

  public async removeTags(tags: string[]): Promise<void> {
    await _Notificare.device().removeTags({ tags });
  }

  public async clearTags(): Promise<void> {
    await _Notificare.device().clearTags();
  }

  public async fetchDoNotDisturb(): Promise<NotificareDoNotDisturb | null> {
    const { result } = await _Notificare.device().fetchDoNotDisturb();
    return result;
  }

  public async updateDoNotDisturb(dnd: NotificareDoNotDisturb): Promise<void> {
    await _Notificare.device().updateDoNotDisturb({ dnd });
  }

  public async clearDoNotDisturb(): Promise<void> {
    await _Notificare.device().clearDoNotDisturb();
  }

  public async fetchUserData(): Promise<Record<string, string>> {
    const { result } = await _Notificare.device().fetchUserData();
    return result;
  }

  public async updateUserData(userData: Record<string, string>): Promise<void> {
    await _Notificare.device().updateUserData({ userData });
  }
}
