export interface NotificareAuthenticationPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
