export interface NotificareScannablesPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
