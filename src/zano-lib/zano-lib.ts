import type {
  API_RETURN_CODE,
  app_connectivity_status,
  get_wallet_files_response,
  open_wallet_response,
  seed_phrase_info,
  wallet_extended_info,
  wallet_sync_status_info,
  WalletErrorCode,
  WalletReturnCode,
  WalletReturnErrors,
} from '../entities';
import type { JSONRpcFailedResponse, JSONRpcResponse, JSONRpcSuccessfulResponse } from '../utils/json-rpc';
import type { JSONConstrain, JSONValue, TypedJSON } from '../utils/typed-json';
import type { ZanoLogLevel, ZanoPriority } from './enums';
import type { ZanoLib } from './zano-lib.nitro';

export enum GENERAL_INTERNAL_ERROR {
  INSTANCE = 'GENERAL_INTERNAL_ERROR: WALLET INSTNACE NOT FOUND',
  INIT = 'Failed to intialize library',
}

export type zano_lib_init_response =
  | TypedJSON<JSONRpcResponse<WalletReturnCode<API_RETURN_CODE.ALREADY_EXISTS | API_RETURN_CODE.OK>, WalletErrorCode<API_RETURN_CODE.INTERNAL_ERROR>>>
  | GENERAL_INTERNAL_ERROR.INIT;
export type zano_lib_reset_response = TypedJSON<JSONRpcSuccessfulResponse<WalletReturnCode<API_RETURN_CODE.OK> | WalletReturnErrors>>;
export type zano_lib_set_log_level_response = TypedJSON<{}>;
export type zano_lib_reset_connection_url_response =
  | TypedJSON<{ error_code: API_RETURN_CODE.OK }>
  | TypedJSON<JSONRpcSuccessfulResponse<WalletReturnErrors>>;
export type zano_lib_get_address_info_response = TypedJSON<{ valid: boolean; auditable: boolean; payment_id: boolean; wrap: boolean }>;
export type zano_lib_get_connectivity_status_response = TypedJSON<JSONRpcSuccessfulResponse<app_connectivity_status | WalletReturnErrors>>;
export type zano_lib_get_appconfig_response<AppConfig extends JSONConstrain<AppConfig>> = TypedJSON<
  AppConfig | JSONRpcFailedResponse<WalletErrorCode<API_RETURN_CODE.NOT_FOUND | API_RETURN_CODE.INVALID_FILE | API_RETURN_CODE.WRONG_PASSWORD>>
>;
export type zano_lib_set_appconfig_response = TypedJSON<
  JSONRpcSuccessfulResponse<WalletReturnCode<API_RETURN_CODE.OK>> | JSONRpcFailedResponse<WalletErrorCode<API_RETURN_CODE.FAIL>>
>;
export type zano_lib_truncate_log_response = TypedJSON<JSONRpcSuccessfulResponse<WalletReturnCode<API_RETURN_CODE.OK>>>;
export type zano_lib_get_export_private_info_response = TypedJSON<
  JSONRpcSuccessfulResponse<WalletReturnCode<API_RETURN_CODE.FAIL | API_RETURN_CODE.OK>>
>;
export type zano_lib_get_wallet_files_response = TypedJSON<get_wallet_files_response>;
export type zano_lib_get_opened_wallets_response = TypedJSON<JSONRpcSuccessfulResponse<open_wallet_response[] | WalletReturnErrors>>;
export type zano_lib_delete_wallet_response = TypedJSON<JSONRpcSuccessfulResponse<WalletReturnCode<API_RETURN_CODE.OK>>>;
export type zano_lib_open_response = TypedJSON<
  JSONRpcResponse<
    WalletReturnCode<API_RETURN_CODE.OK | API_RETURN_CODE.FILE_RESTORED> | WalletReturnErrors,
    WalletErrorCode<
      | API_RETURN_CODE.ALREADY_EXISTS
      | API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED
      | API_RETURN_CODE.FILE_NOT_FOUND
      | API_RETURN_CODE.INVALID_FILE
      | API_RETURN_CODE.WRONG_PASSWORD
      | `${API_RETURN_CODE.INTERNAL_ERROR}, DESCRIPTION: ${string}`
    >
  >
>;
export type zano_lib_restore_response = TypedJSON<
  JSONRpcResponse<
    open_wallet_response | WalletReturnErrors,
    WalletErrorCode<API_RETURN_CODE.ALREADY_EXISTS | API_RETURN_CODE.WRONG_SEED | `${API_RETURN_CODE.FAIL}:${string}`>
  >
>;
export type zano_lib_generate_response = TypedJSON<
  JSONRpcResponse<
    open_wallet_response | WalletReturnErrors,
    WalletErrorCode<API_RETURN_CODE.ALREADY_EXISTS | API_RETURN_CODE.WRONG_SEED | `${API_RETURN_CODE.FAIL}:${string}`>
  >
>;
export type zano_lib_get_wallet_info_response = TypedJSON<JSONRpcSuccessfulResponse<wallet_extended_info | WalletReturnErrors>>;
export type zano_lib_get_wallet_status_response =
  | TypedJSON<JSONRpcSuccessfulResponse<wallet_sync_status_info | WalletReturnErrors>>
  | API_RETURN_CODE.WALLET_WRONG_ID;
export type zano_lib_get_seed_phrase_info_params = TypedJSON<{ seed_phrase: string; seed_password: string }>;
export type zano_lib_get_seed_phrase_info_response = TypedJSON<
  { error_code: 'Wrong parameter' } | { error_code: API_RETURN_CODE.OK; response_data: seed_phrase_info }
>;
export type zano_lib_reset_wallet_password_response =
  | API_RETURN_CODE.OK
  | API_RETURN_CODE.FAIL
  | TypedJSON<JSONRpcSuccessfulResponse<WalletReturnErrors>>
  | API_RETURN_CODE.WALLET_WRONG_ID;
export type zano_lib_close_wallet_response = TypedJSON<
  JSONRpcSuccessfulResponse<
    | { response: API_RETURN_CODE.WALLET_WRONG_ID | `${API_RETURN_CODE.FAIL}:${string}` | API_RETURN_CODE.OK | API_RETURN_CODE.INTERNAL_ERROR }
    | WalletReturnErrors
  >
>;

export interface IZanoLib<AppConfig extends JSONConstrain<AppConfig> = JSONValue> extends ZanoLib {
  init(ip: string, port: string, working_dir: string, log_level: ZanoLogLevel): zano_lib_init_response;
  reset(): zano_lib_reset_response;
  set_log_level(log_level: ZanoLogLevel): zano_lib_set_log_level_response;
  reset_connection_url(url: string): zano_lib_reset_connection_url_response;
  get_version(): `${number}.${number}.${number}.${number}[${string}]`;

  get_address_info(addr: string): zano_lib_get_address_info_response;
  get_connectivity_status(): zano_lib_get_connectivity_status_response;
  get_current_tx_fee(priority: ZanoPriority): number;

  get_appconfig(encryption_key: string): zano_lib_get_appconfig_response<AppConfig>;
  set_appconfig(conf_str: string, encryption_key: string): zano_lib_set_appconfig_response;

  get_logs_buffer(): string;
  truncate_log(): zano_lib_truncate_log_response;
  get_export_private_info(): zano_lib_get_export_private_info_response;
  generate_random_key(length: number): string;

  get_wallet_files(): zano_lib_get_wallet_files_response;
  get_opened_wallets(): zano_lib_get_opened_wallets_response;
  is_wallet_exist(path: string): boolean;
  delete_wallet(file_name: string): zano_lib_delete_wallet_response;
  open(path: string, password: string): zano_lib_open_response;
  restore(seed: string, path: string, password: string, seed_password: string): zano_lib_restore_response;
  generate(path: string, password: string): zano_lib_generate_response;

  get_wallet_info(instance_id: number): zano_lib_get_wallet_info_response;
  get_wallet_status(instance_id: number): zano_lib_get_wallet_status_response;
  get_seed_phrase_info(instance_id: number, params: zano_lib_get_seed_phrase_info_params): zano_lib_get_seed_phrase_info_response;
  reset_wallet_password(instance_id: number, password: string): zano_lib_reset_wallet_password_response;
  close_wallet(instance_id: number): zano_lib_close_wallet_response;
}
