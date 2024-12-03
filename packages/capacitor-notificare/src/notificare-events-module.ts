import { _Notificare } from './plugin';

export class NotificareEventsModule {
  /**
   * Logs in Notificare a custom event in the application.
   *
   * This function allows logging, in Notificare, of application-specific events,
   * optionally associating structured data for more detailed event tracking and
   * analysis.
   *
   * @param event The name of the custom event to log.
   * @param data Optional structured event data for further details.
   */
  public async logCustom(event: string, data?: Record<string, any>): Promise<void> {
    await _Notificare.logCustom({ event, data });
  }
}
