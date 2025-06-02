import type { HybridObject } from 'react-native-nitro-modules';
import type { ZanoLogLevel, ZanoPriority } from './enums';

export interface PlainWallet extends HybridObject<{ ios: 'c++'; android: 'c++' }> {
  init(address: string, working_dir: string, log_level: ZanoLogLevel): Promise<string>;
  reset(): string;
  set_log_level(log_level: ZanoLogLevel): string;
  get_version(): string;
  get_wallet_files(): string;
  get_export_private_info(target_dir: string): string;
  delete_wallet(file_name: string): string;
  get_address_info(addr: string): string;

  get_appconfig(encryption_key: string): string;
  set_appconfig(conf_str: string, encryption_key: string): string;
  generate_random_key(lenght: number): string;
  get_logs_buffer(): Promise<string>;
  truncate_log(): string;
  get_connectivity_status(): string;

  open(path: string, password: string): Promise<string>;
  restore(seed: string, path: string, password: string, seed_password: string): Promise<string>;
  generate(path: string, password: string): Promise<string>;
  get_opened_wallets(): Promise<string>;

  get_wallet_status(instance_id: number): string;
  close_wallet(instance_id: number): string;

  get_wallet_info(instance_id: number): string;
  is_wallet_exist(path: string): boolean;
  reset_wallet_password(instance_id: number, password: string): string;

  get_current_tx_fee(priority: ZanoPriority): number;

  get_seed_phrase_info(instance_id: number, params: string): string;
  reset_connection_url(address: string): string;
}
