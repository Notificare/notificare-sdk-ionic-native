export interface NotificareGeoPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
