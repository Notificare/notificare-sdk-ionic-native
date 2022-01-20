export interface NotificareInboxPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
