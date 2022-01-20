export interface NotificareLoyaltyPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
