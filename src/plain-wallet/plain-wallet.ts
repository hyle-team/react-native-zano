import type {
  API_RETURN_CODE,
  app_connectivity_status,
  ErrorCode,
  GeneralReturnErrors,
  open_wallet_response,
  ReturnCode,
  seed_phrase_info,
  wallet_extended_info,
  wallet_sync_status_info,
} from '../entities';
import type { JSONRpcFailedResponse, JSONRpcSuccessfulResponse } from '../utils/json-rpc';
import type { JSONConstrain, JSONValue, TypedJSON } from '../utils/typed-json';
import type { GENERAL_INTERNAL_ERROR, ZanoLogLevel, ZanoPriority } from './enums';
import type { PlainWallet } from './plain-wallet.nitro';

export type zano_lib_init_response =
  | TypedJSON<
      | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.ALREADY_EXISTS | API_RETURN_CODE.OK>>
      | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.INTERNAL_ERROR>>
    >
  | GENERAL_INTERNAL_ERROR.INIT;
export type zano_lib_reset_response = TypedJSON<JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.OK>> | GeneralReturnErrors>;
export type zano_lib_set_log_level_response = TypedJSON<{}>;
export type zano_lib_reset_connection_url_response = TypedJSON<{ error_code: API_RETURN_CODE.OK } | GeneralReturnErrors>;
export type zano_lib_get_address_info_response = TypedJSON<{ valid: boolean; auditable: boolean; payment_id: boolean; wrap: boolean }>;
export type zano_lib_get_connectivity_status_response = TypedJSON<JSONRpcSuccessfulResponse<app_connectivity_status> | GeneralReturnErrors>;
export type zano_lib_get_appconfig_response<AppConfig extends JSONConstrain<AppConfig>> = TypedJSON<
  | AppConfig
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.NOT_FOUND>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.INVALID_FILE>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WRONG_PASSWORD>>
>;
export type zano_lib_set_appconfig_response = TypedJSON<
  JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.OK>> | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.FAIL>>
>;
export type zano_lib_truncate_log_response = TypedJSON<JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.OK>>>;
export type zano_lib_get_export_private_info_response = TypedJSON<
  JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.FAIL>> | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.OK>>
>;
export type zano_lib_get_wallet_files_response = TypedJSON<{ items?: string[] }>;
export type zano_lib_get_opened_wallets_response = TypedJSON<JSONRpcSuccessfulResponse<open_wallet_response[]> | GeneralReturnErrors>;
export type zano_lib_delete_wallet_response = TypedJSON<JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.OK>>>;
export type zano_lib_open_response = TypedJSON<
  | GeneralReturnErrors
  | JSONRpcSuccessfulResponse<Omit<open_wallet_response, 'name' | 'pass'>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.ALREADY_EXISTS>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.FILE_NOT_FOUND>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.INVALID_FILE>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WRONG_PASSWORD>>
  | JSONRpcFailedResponse<ErrorCode<`${API_RETURN_CODE.INTERNAL_ERROR}, DESCRIPTION: ${string}`>>
>;
export type zano_lib_restore_response = TypedJSON<
  | GeneralReturnErrors
  | JSONRpcSuccessfulResponse<open_wallet_response>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.ALREADY_EXISTS>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WRONG_SEED>>
  | JSONRpcFailedResponse<ErrorCode<`${API_RETURN_CODE.FAIL}:${string}`>>
>;
export type zano_lib_generate_response = TypedJSON<
  | GeneralReturnErrors
  | JSONRpcSuccessfulResponse<open_wallet_response>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.ALREADY_EXISTS>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WRONG_SEED>>
  | JSONRpcFailedResponse<ErrorCode<`${API_RETURN_CODE.FAIL}:${string}`>>
>;
export type zano_lib_get_wallet_info_response = TypedJSON<JSONRpcSuccessfulResponse<wallet_extended_info> | GeneralReturnErrors>;
export type zano_lib_get_wallet_status_response =
  | TypedJSON<GeneralReturnErrors | JSONRpcSuccessfulResponse<wallet_sync_status_info>>
  | API_RETURN_CODE.WALLET_WRONG_ID;
export type zano_lib_get_seed_phrase_info_params = TypedJSON<{ seed_phrase: string; seed_password: string }>;
export type zano_lib_get_seed_phrase_info_response = TypedJSON<
  { error_code: 'Wrong parameter' } | { error_code: API_RETURN_CODE.OK; response_data: seed_phrase_info }
>;
export type zano_lib_reset_wallet_password_response =
  | API_RETURN_CODE.OK
  | API_RETURN_CODE.FAIL
  | TypedJSON<GeneralReturnErrors>
  | API_RETURN_CODE.WALLET_WRONG_ID;
export type zano_lib_close_wallet_response = TypedJSON<
  | GeneralReturnErrors
  | JSONRpcSuccessfulResponse<{
      response: API_RETURN_CODE.WALLET_WRONG_ID | `${API_RETURN_CODE.FAIL}:${string}` | API_RETURN_CODE.OK | API_RETURN_CODE.INTERNAL_ERROR;
    }>
>;

export interface IPlainWallet<AppConfig extends JSONConstrain<AppConfig> = JSONValue> extends PlainWallet {
  init(address: string, working_dir: string, log_level: ZanoLogLevel): zano_lib_init_response;
  reset(): zano_lib_reset_response;
  set_log_level(log_level: ZanoLogLevel): zano_lib_set_log_level_response;
  reset_connection_url(address: string): zano_lib_reset_connection_url_response;
  get_version(): `${number}.${number}.${number}.${number}[${string}]`;

  get_address_info(addr: string): zano_lib_get_address_info_response;
  get_connectivity_status(): zano_lib_get_connectivity_status_response;
  get_current_tx_fee(priority: ZanoPriority): number;

  get_appconfig(encryption_key: string): zano_lib_get_appconfig_response<AppConfig>;
  set_appconfig(conf_str: string, encryption_key: string): zano_lib_set_appconfig_response;

  get_logs_buffer(): Promise<string>;
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
