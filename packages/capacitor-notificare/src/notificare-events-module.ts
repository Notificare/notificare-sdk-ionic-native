import { _Notificare } from './plugin';

export class NotificareEventsModule {
  /**
   * Logs in Notificare a custom event in the application.
   *
   * This function allows logging, in Notificare, of application-specific events,
   * optionally associating structured data for more detailed event tracking and
   * analysis.
   *
   * @param {string} event - The name of the custom event to log.
   * @param {Record<string, any>} data - Optional structured event data for
   * further details.
   * @returns {Promise<void>} - A promise that resolves when the custom event
   * has been successfully logged.
   */
  public async logCustom(event: string, data?: Record<string, any>): Promise<void> {
    await _Notificare.logCustom({ event, data });
  }
}
