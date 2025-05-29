import type { HybridObject } from 'react-native-nitro-modules';

export interface ReactNativeZano extends HybridObject<{ ios: 'c++'; android: 'c++' }> {
  init(ip: string, port: string, log_level: number): string;
  reset(): string;
  set_log_level(log_level: number): string;
  get_version(): string;
  get_wallet_files(): string;
  get_export_private_info(target_dir: string): string;
  delete_wallet(file_name: string): string;
  get_address_info(addr: string): string;

  get_appconfig(encryption_key: string): string;
  set_appconfig(conf_str: string, encryption_key: string): string;
  generate_random_key(lenght: number): string;
  get_logs_buffer(): string;
  truncate_log(): string;
  get_connectivity_status(): string;

  open(path: string, password: string): string;
  restore(seed: string, path: string, password: string, seed_password: string): string;
  generate(path: string, password: string): string;
  get_opened_wallets(): string


  get_wallet_status(instance_id: number): string;
  close_wallet(instance_id: number): string;
  invoke(instance_id: number, params: string): string;
  call(method_name: string, instance_id: number, params: string): Promise<string>;

  //cake wallet api extension
  is_wallet_exist(path: string): boolean;
  get_wallet_info(instance_id: number): string;
  reset_wallet_password(instance_id: number, password: string): string;
  get_current_tx_fee(priority: number): number; // 0 (default), 1 (unimportant), 2 (normal), 3 (elevated), 4 (priority)
}
