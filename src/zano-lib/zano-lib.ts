import type { HybridObject } from 'react-native-nitro-modules';
import type {
  API_RETURN_CODE,
  app_connectivity_status,
  get_address_info_response,
  get_wallet_files_response,
  open_wallet_response,
  seed_phrase_info,
  set_log_level_response,
  wallet_sync_status_info,
  WalletErrorCode,
  WalletReturnCode,
  WalletReturnErrors,
} from '../entities';
import type { JSONRpcFailedResponse, JSONRpcResponse, JSONRpcSuccessfulResponse } from '../utils/json-rpc';
import type { JSONConstrain, JSONValue, TypedJSON } from '../utils/typed-json';
import type { ZanoLibMethods, ZanoLib as ZanoLibRaw } from './zano-lib.nitro';

export enum GENERAL_INTERNAL_ERROR {
  INSTANCE = 'GENERAL_INTERNAL_ERROR: WALLET INSTNACE NOT FOUND',
  INIT = 'Failed to intialize library',
}

type Params<Name extends ZanoLibMethods> = Parameters<ZanoLibRaw[Name]>;
export interface IZanoLib<AppConfig extends JSONConstrain<AppConfig> = JSONValue> extends HybridObject {
  init(
    ...params: Params<'init'>
  ): Promise<
    | TypedJSON<
        JSONRpcResponse<WalletReturnCode<API_RETURN_CODE.ALREADY_EXISTS | API_RETURN_CODE.OK>, WalletErrorCode<API_RETURN_CODE.INTERNAL_ERROR>>
      >
    | GENERAL_INTERNAL_ERROR.INIT
  >;
  reset(...params: Params<'reset'>): TypedJSON<JSONRpcSuccessfulResponse<WalletReturnCode<API_RETURN_CODE.OK> | WalletReturnErrors>>;
  set_log_level(...params: Params<'set_log_level'>): TypedJSON<set_log_level_response>;
  sync_call_reset_connection_url(
    url: string
  ): TypedJSON<{ error_code: API_RETURN_CODE.OK }> | TypedJSON<JSONRpcSuccessfulResponse<WalletReturnErrors>>;
  get_version(...params: Params<'get_version'>): `${number}.${number}.${number}.${number}[${string}]`;

  get_address_info(...params: Params<'get_address_info'>): TypedJSON<get_address_info_response>;
  get_connectivity_status(
    ...params: Params<'get_connectivity_status'>
  ): TypedJSON<JSONRpcSuccessfulResponse<app_connectivity_status | WalletReturnErrors>>;
  get_current_tx_fee(...params: Params<'get_current_tx_fee'>): number;

  get_appconfig(
    ...params: Params<'get_appconfig'>
  ): Promise<
    TypedJSON<
      AppConfig | JSONRpcFailedResponse<WalletErrorCode<API_RETURN_CODE.NOT_FOUND | API_RETURN_CODE.INVALID_FILE | API_RETURN_CODE.WRONG_PASSWORD>>
    >
  >;
  set_appconfig(
    ...params: Params<'set_appconfig'>
  ): Promise<
    TypedJSON<JSONRpcSuccessfulResponse<WalletReturnCode<API_RETURN_CODE.OK>> | JSONRpcFailedResponse<WalletErrorCode<API_RETURN_CODE.FAIL>>>
  >;

  get_logs_buffer(...params: Params<'get_logs_buffer'>): Promise<string>;
  truncate_log(...params: Params<'truncate_log'>): Promise<TypedJSON<JSONRpcSuccessfulResponse<WalletReturnCode<API_RETURN_CODE.OK>>>>;
  get_export_private_info(): Promise<TypedJSON<JSONRpcSuccessfulResponse<WalletReturnCode<API_RETURN_CODE.FAIL | API_RETURN_CODE.OK>>>>;
  generate_random_key(...params: Params<'generate_random_key'>): Promise<string>;

  get_wallet_files(...params: Params<'get_wallet_files'>): Promise<TypedJSON<get_wallet_files_response>>;
  get_opened_wallets(...params: Params<'get_opened_wallets'>): TypedJSON<JSONRpcSuccessfulResponse<open_wallet_response[] | WalletReturnErrors>>;
  is_wallet_exist(...params: Params<'is_wallet_exist'>): boolean;
  delete_wallet(...params: Params<'delete_wallet'>): Promise<TypedJSON<JSONRpcSuccessfulResponse<WalletReturnCode<API_RETURN_CODE.OK>>>>;
  open(
    ...params: Params<'open'>
  ): Promise<
    TypedJSON<
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
    >
  >;
  restore(
    ...params: Params<'restore'>
  ): Promise<
    TypedJSON<
      JSONRpcResponse<
        open_wallet_response | WalletReturnErrors,
        WalletErrorCode<API_RETURN_CODE.ALREADY_EXISTS | API_RETURN_CODE.WRONG_SEED | `${API_RETURN_CODE.FAIL}:${string}`>
      >
    >
  >;
  generate(
    ...params: Params<'generate'>
  ): Promise<
    TypedJSON<
      JSONRpcResponse<
        open_wallet_response | WalletReturnErrors,
        WalletErrorCode<API_RETURN_CODE.ALREADY_EXISTS | API_RETURN_CODE.WRONG_SEED | `${API_RETURN_CODE.FAIL}:${string}`>
      >
    >
  >;

  get_wallet_info(...params: Params<'get_wallet_info'>): string;
  get_wallet_status(
    ...params: Params<'get_wallet_status'>
  ): TypedJSON<JSONRpcSuccessfulResponse<wallet_sync_status_info | WalletReturnErrors>> | API_RETURN_CODE.WALLET_WRONG_ID;
  sync_call_get_seed_phrase_info(
    instance_id: number,
    params: TypedJSON<{ seed_phrase: string; seed_password: string }>
  ): TypedJSON<{ error_code: 'Wrong parameter' } | { error_code: API_RETURN_CODE.OK; response_data: seed_phrase_info }>;
  reset_wallet_password(...params: Params<'reset_wallet_password'>): string;
  close_wallet(
    ...params: Params<'close_wallet'>
  ): TypedJSON<
    JSONRpcSuccessfulResponse<
      | { response: API_RETURN_CODE.WALLET_WRONG_ID | `${API_RETURN_CODE.FAIL}:${string}` | API_RETURN_CODE.OK | API_RETURN_CODE.INTERNAL_ERROR }
      | WalletReturnErrors
    >
  >;
}
