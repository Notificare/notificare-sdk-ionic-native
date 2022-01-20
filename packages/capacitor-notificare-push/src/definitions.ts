export interface NotificarePushPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
