export interface NotificarePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
