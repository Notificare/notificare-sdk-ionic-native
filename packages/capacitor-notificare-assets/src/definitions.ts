export interface NotificareAssetsPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
