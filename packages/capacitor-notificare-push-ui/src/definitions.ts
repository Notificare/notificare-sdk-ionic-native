export interface NotificarePushUIPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
