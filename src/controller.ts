import type { HybridObject } from 'react-native-nitro-modules';
import {
  assertCoreRpcError,
  assertErrorCode,
  assertReturnErrors,
  assertStatusFieldErrors,
  assertWalletRpcError,
  type CoreCodeErrors,
  type ErrorCodeErrors,
  type ReturnCodeErrors,
  type StatusFieldErrors,
  type WalletCodeErrors,
} from './asserts';
import type { ICoreRpc } from './core-rpc';
import { CoreRpc } from './core-rpc';
import { API_RETURN_CODE, type open_wallet_response, type wallet_info_extra } from './entities';
import {
  ZanoAlreadyExistsError,
  ZanoFailedError,
  ZanoGeneralError,
  ZanoInitializeError,
  ZanoInternalError,
  ZanoNotFoundError,
  ZanoUninitializedError,
  ZanoWalletRpcWrongArgumentError,
  ZanoWrongWalletIdError,
} from './errors';
import { PlainWallet } from './plain-wallet';
import { GENERAL_INTERNAL_ERROR, ZanoLogLevel, ZanoPriority } from './plain-wallet/enums';
import { PlatformUtils } from './platform-utils';
import type { UnwrapTypedBase64 } from './utils/typed-base64';
import { TypedJSON, type JSONConstrain, type UnwrapTypedJSON } from './utils/typed-json';
import type { DeepReadonly } from './utils/types';
import type { IWalletRpc } from './wallet-rpc';
import { WalletRpc } from './wallet-rpc';

export class ZanoController {
  constructor(address: string | [host: string, port: string] = 'https://node.zano.org:443', log_level = ZanoLogLevel.DISABLED) {
    this.#log_level = log_level;

    if (Array.isArray(address)) {
      this.#remote_node = address;
    } else if (address.startsWith('http:')) {
      const [host, port] = address.substring('http:'.length).split(':');
      if (!host) throw new ZanoGeneralError('invalid address passed');
      this.#remote_node = [`http:${host}`, port || '80'];
    } else if (address.startsWith('https:')) {
      const [host, port] = address.substring('https:'.length).split(':');
      if (!host) throw new ZanoGeneralError('invalid address passed');
      this.#remote_node = [`https:${host}`, port || '443'];
    } else {
      const [host, port] = address.split(':');
      if (!host || !port) throw new ZanoGeneralError('invalid address passed');
      this.#remote_node = [host, port];
    }
  }

  #init_result: undefined | API_RETURN_CODE.OK | API_RETURN_CODE.ALREADY_EXISTS;
  async initialize() {
    if (this.#init_result) throw new ZanoAlreadyExistsError();
    {
      const [host, port] = this.#remote_node;
      const response = await PlainWallet.init(host, port, PlatformUtils.get_working_directory(), this.#log_level);
      if (response === GENERAL_INTERNAL_ERROR.INIT) throw new ZanoInitializeError();
      const json = TypedJSON.parse(response);
      if (json.error) throw new ZanoInternalError(json.error.message);
      this.#init_result = json.result.return_code;
    }

    TypedJSON.parse(await PlainWallet.get_wallet_files()).items?.forEach((name) => {
      this.#wallet_files.set(name, new ZanoWalletFile(this, name));
    });

    {
      const response = TypedJSON.parse(await PlainWallet.get_opened_wallets());
      assertReturnErrors(response);
      response.result?.forEach((file_response) => {
        let file = this.#wallet_files.get(file_response.name);
        if (file === undefined) {
          this.#wallet_files.set(file_response.name, new ZanoWalletFile(this, file_response.name, file_response));
        } else {
          wallets.set(file, new ZanoWallet(file, file_response));
        }
      });
    }
  }
  dispose() {
    if (!this.#init_result) throw new ZanoUninitializedError();
    const response = TypedJSON.parse(PlainWallet.reset());
    assertReturnErrors(response);
  }

  get lib_version() {
    return PlainWallet.get_version();
  }
  get working_directory() {
    return PlatformUtils.get_working_directory();
  }
  get downloads_directory() {
    return PlatformUtils.get_downloads_directory();
  }

  #log_level: ZanoLogLevel;
  get log_level() {
    return this.#log_level;
  }
  set log_level(next: ZanoLogLevel) {
    PlainWallet.set_log_level(next);
  }

  #remote_node: [host: string, port: string];
  get remote_node() {
    return this.#remote_node;
  }
  // set remote_node(address: string) {
  //   this.#remote_node = address;
  //   PlainWallet.reset_connection_url(address);
  // }

  get_address_info(addr: string) {
    return TypedJSON.parse(PlainWallet.get_address_info(addr));
  }
  get_seed_phrase_info(seed_phrase: string, seed_password: string) {
    const response = TypedJSON.parse(PlainWallet.get_seed_phrase_info(TypedJSON.stringify({ seed_phrase, seed_password })));
    if (response.error_code === 'Wrong parameter') throw new ZanoWalletRpcWrongArgumentError('Wrong parameter');
    return response.response_data;
  }
  get_connectivity_status() {
    const response = TypedJSON.parse(PlainWallet.get_connectivity_status());
    assertReturnErrors(response);
    return response.result;
  }
  get_current_tx_fee(priority: ZanoPriority) {
    return PlainWallet.get_current_tx_fee(priority);
  }

  get_logs_buffer() {
    return PlainWallet.get_logs_buffer();
  }
  async truncate_log() {
    const response = TypedJSON.parse(await PlainWallet.truncate_log());
    assertErrorCode(response);
  }
  async export_private_info(target_dir: string) {
    const response = TypedJSON.parse(await PlainWallet.get_export_private_info(target_dir));
    assertReturnErrors(response);
  }
  generate_random_key(length = 20) {
    return PlainWallet.generate_random_key(length);
  }

  #wallet_files = new Map<string, ZanoWalletFile>();
  get wallet_files(): ReadonlyMap<string, ZanoWalletFile> {
    return this.#wallet_files;
  }
  async delete_wallet_file(name: string) {
    const file = this.#wallet_files.get(name);
    if (!file) return;
    await file.wallet?.close();
    const response = TypedJSON.parse(PlainWallet.delete_wallet(name));
    assertErrorCode(response);
    this.#wallet_files.delete(name);
  }

  async restore_wallet(name: string, wallet_password: string, seed: string, seed_password: string) {
    if (this.#wallet_files.has(name)) throw new ZanoAlreadyExistsError('wallet file already exists');
    const response = TypedJSON.parse(await PlainWallet.restore(seed, name, wallet_password, seed_password));
    assertErrorCode(response);
    assertReturnErrors(response);
    const file = new ZanoWalletFile(this, name, response.result);
    this.#wallet_files.set(name, file);
    return file.wallet!;
  }
  async generate_wallet(name: string, password: string) {
    if (this.#wallet_files.has(name)) throw new ZanoAlreadyExistsError('wallet file already exists');
    const response = TypedJSON.parse(await PlainWallet.generate(name, password));
    assertErrorCode(response);
    assertReturnErrors(response);
    const file = new ZanoWalletFile(this, name, response.result);
    this.#wallet_files.set(name, file);
    return file.wallet!;
  }

  readonly daemon = (Object.keys(Object.getPrototypeOf(CoreRpc)) as Array<Exclude<keyof ICoreRpc, keyof HybridObject> | '__type'>).reduce(
    (methods, name) => {
      if (name === '__type') return methods;
      if (name === 'base64_encode' || name === 'base64_decode') return methods;
      methods[name] = (async (params: UnwrapTypedJSON<Parameters<ICoreRpc[typeof name]>[0]>) => {
        const response = TypedJSON.parse(await CoreRpc[name](TypedJSON.stringify(params) as never));
        assertReturnErrors(response);
        assertCoreRpcError(response);
        const body = TypedJSON.parse(CoreRpc.base64_decode(response.base64_body));
        assertErrorCode(body);
        if (body.error) throw body.error;
        const result = body.result;
        if (typeof result === 'object') {
          assertStatusFieldErrors(result, {
            NOT_FOUND: () => {
              switch (name) {
                case 'get_asset_info':
                  return new ZanoNotFoundError(`Asset with specified id(${params}) is not found`);
                case 'get_alias_by_address':
                  return new ZanoNotFoundError(`No alises found`);
                default:
                  return new ZanoGeneralError(API_RETURN_CODE.NOT_FOUND);
              }
            },
          });
        }
        return result;
      }) as never;
      return methods;
    },
    {} as {
      [Name in Exclude<keyof ICoreRpc, keyof HybridObject | 'base64_encode' | 'base64_decode'>]: (
        params: UnwrapTypedJSON<Parameters<ICoreRpc[Name]>[0]>
      ) => Promise<
        Exclude<
          Exclude<
            UnwrapTypedJSON<
              UnwrapTypedBase64<Exclude<UnwrapTypedJSON<Awaited<ReturnType<ICoreRpc[Name]>>>, ReturnCodeErrors | CoreCodeErrors>['base64_body']>
            >,
            { result: null }
          >['result'],
          StatusFieldErrors
        >
      >;
    }
  );
}

const wallets = new WeakMap<ZanoWalletFile, ZanoWallet | null>();
export class ZanoWalletFile {
  constructor(
    readonly api: ZanoController,
    readonly name: string,
    response?: open_wallet_response
  ) {
    wallets.set(this, response ? new ZanoWallet(this, response) : null);
  }
  get wallet() {
    return wallets.get(this);
  }

  async open(password: string) {
    if (this.wallet) return this.wallet;
    const response = TypedJSON.parse(await PlainWallet.open(this.name, password));
    assertErrorCode(response);
    assertReturnErrors(response);
    const wallet = new ZanoWallet(this, { ...response.result, name: this.name, pass: password });
    wallets.set(this, wallet);
    return wallet;
  }
}

export class ZanoWallet implements DeepReadonly<open_wallet_response> {
  readonly wallet_id: DeepReadonly<open_wallet_response>['wallet_id'];
  readonly recent_history: DeepReadonly<open_wallet_response>['recent_history'];
  readonly wi: DeepReadonly<open_wallet_response>['wi'];
  readonly wi_extended: DeepReadonly<wallet_info_extra> | undefined;
  readonly seed: DeepReadonly<open_wallet_response>['seed'];
  readonly recovered: DeepReadonly<open_wallet_response>['recovered'];
  readonly wallet_local_bc_size: DeepReadonly<open_wallet_response>['wallet_local_bc_size'];
  readonly wallet_file_size: DeepReadonly<open_wallet_response>['wallet_file_size'];
  readonly name: DeepReadonly<open_wallet_response>['name'];
  readonly pass: DeepReadonly<open_wallet_response>['pass'];

  constructor(
    readonly file: ZanoWalletFile,
    response: open_wallet_response
  ) {
    this.wallet_id = response.wallet_id;
    this.recent_history = response.recent_history;
    this.wi = response.wi;
    this.seed = response.seed;
    this.recovered = response.recovered;
    this.wallet_local_bc_size = response.wallet_local_bc_size;
    this.wallet_file_size = response.wallet_file_size;
    this.name = response.name;
    this.pass = response.pass;
  }

  async update_wallet_info() {
    const response = TypedJSON.parse(await PlainWallet.get_wallet_info(this.wallet_id));
    assertReturnErrors(response);
    const { wi, wi_extended } = response.result;
    Object.defineProperty(this, 'wi', { value: wi, writable: false, enumerable: true, configurable: true });
    Object.defineProperty(this, 'wi_extended', { value: wi_extended, writable: false, enumerable: true, configurable: true });
    return response.result;
  }

  get_status() {
    const response = TypedJSON.parse(PlainWallet.get_wallet_status(this.wallet_id));
    assertReturnErrors(response);
    return response;
  }

  reset_file_password(password: string) {
    const response = PlainWallet.reset_wallet_password(this.wallet_id, password);
    if (response !== API_RETURN_CODE.OK) {
      if (response === API_RETURN_CODE.FAIL) throw new ZanoFailedError();
      if (response === API_RETURN_CODE.WALLET_WRONG_ID) throw new ZanoWrongWalletIdError();
      assertReturnErrors(TypedJSON.parse(response));
    }
    Object.defineProperty(this, 'pass', { value: password, writable: false, enumerable: true, configurable: true });
  }

  async assets_whitelist_add(params: { asset_id: string }) {
    const response = await callZanoWalletRpc('assets_whitelist_add', this.wallet_id, params);
    assertStatusFieldErrors(response, {
      NOT_FOUND: () => new ZanoNotFoundError(`Asset with specified id(${params.asset_id}) is not found`),
    });
    return response;
  }

  async assets_whitelist_remove(params: { asset_id: string }) {
    const response = await callZanoWalletRpc('assets_whitelist_remove', this.wallet_id, params);
    assertStatusFieldErrors(response, {
      NOT_FOUND: () => new ZanoNotFoundError(`Asset with specified id(${params.asset_id}) is not found`),
    });
    return response;
  }

  async store() {
    const response = await callZanoWalletRpc('store', this.wallet_id, {});
    Object.defineProperty(this, 'wallet_file_size', { value: response.wallet_file_size, writable: false, enumerable: true, configurable: true });
    return response;
  }

  async close() {
    const response = TypedJSON.parse(await PlainWallet.close_wallet(this.wallet_id));
    assertReturnErrors(response);
    const code = response.response;
    if (code !== API_RETURN_CODE.OK) {
      if (code === API_RETURN_CODE.WALLET_WRONG_ID) throw new ZanoWrongWalletIdError();
      if (code === API_RETURN_CODE.INTERNAL_ERROR) throw new ZanoInternalError();
      if (code.startsWith(`${API_RETURN_CODE.FAIL}:`)) throw new ZanoFailedError(code.substring(`${API_RETURN_CODE.FAIL}:`.length));
    }
    wallets.set(this.file, null);
  }
}
type _ExtractResponse<T> = Exclude<UnwrapTypedJSON<T>, ReturnCodeErrors | ErrorCodeErrors | WalletCodeErrors>['result'];
type ExtractResponse<T> = T extends Promise<infer V> ? Promise<_ExtractResponse<V>> : _ExtractResponse<T>;
type WalletRpcWrappers = {
  [Name in Exclude<keyof IWalletRpc, keyof HybridObject | 'store' | 'assets_whitelist_add' | 'assets_whitelist_remove'>]: (
    params: UnwrapTypedJSON<Parameters<IWalletRpc[Name]>[1]>
  ) => ExtractResponse<ReturnType<IWalletRpc[Name]>>;
};
export interface ZanoWallet extends WalletRpcWrappers {}
function callZanoWalletRpc<Name extends Exclude<keyof IWalletRpc, keyof HybridObject>>(
  method: Name,
  wallet_id: number,
  params: UnwrapTypedJSON<Parameters<IWalletRpc[Name]>[1]>
): ExtractResponse<ReturnType<IWalletRpc[Name]>> {
  const handleResponse = (response: Awaited<ReturnType<(typeof WalletRpc)[Exclude<keyof IWalletRpc, keyof HybridObject>]>>) => {
    if (response === API_RETURN_CODE.WALLET_WRONG_ID) throw new ZanoWrongWalletIdError();
    const json = TypedJSON.parse(response);
    assertErrorCode(json);
    assertReturnErrors(json);
    assertWalletRpcError(json);
    return json.result;
  };
  const result = WalletRpc[method](wallet_id, TypedJSON.stringify(params as never));
  if (result instanceof Promise) {
    return result.then(handleResponse) as never;
  }
  return handleResponse(result) as never;
}
(
  [
    'getbalance',
    'getaddress',
    'get_wallet_info',
    'get_recent_txs_and_info',
    'get_recent_txs_and_info2',
    'transfer',
    // 'store',
    'get_payments',
    'get_bulk_payments',
    'make_integrated_address',
    'split_integrated_address',
    'sweep_below',
    'get_bare_outs_stats',
    'sweep_bare_outs',
    'sign_transfer',
    'submit_transfer',
    'search_for_transactions',
    'search_for_transactions2',
    'get_restore_info',
    // 'get_seed_phrase_info',
    'get_mining_history',
    'register_alias',
    'update_alias',
    // 'contracts_send_proposal',
    // 'contracts_accept_proposal',
    // 'contracts_get_all',
    // 'contracts_release',
    // 'contracts_request_cancel',
    // 'contracts_accept_cancel',
    'marketplace_get_offers_ex',
    'marketplace_push_offer',
    'marketplace_push_update_offer',
    'marketplace_cancel_offer',
    // 'atomics_create_htlc_proposal',
    // 'atomics_get_list_of_active_htlc',
    // 'atomics_redeem_htlc',
    // 'atomics_check_htlc_redeemed',
    'ionic_swap_generate_proposal',
    'ionic_swap_get_proposal_info',
    'ionic_swap_accept_proposal',
    'assets_whitelist_get',
    // 'assets_whitelist_add',
    // 'assets_whitelist_remove',
    'deploy_asset',
    'emit_asset',
    'update_asset',
    'burn_asset',
    'send_ext_signed_asset_tx',
    'attach_asset_descriptor',
    'transfer_asset_ownership',
    'mw_get_wallets',
    'mw_select_wallet',
    'sign_message',
    'encrypt_data',
    'decrypt_data',
    // 'proxy_to_daemon',
  ] as Array<keyof IWalletRpc>
).forEach((name) => {
  const method = function <Name extends Exclude<keyof IWalletRpc, keyof HybridObject>>(
    this: ZanoWallet,
    params: UnwrapTypedJSON<Parameters<IWalletRpc[Name]>[1]>
  ) {
    return callZanoWalletRpc(name as Name, this.wallet_id, params);
  };
  Object.defineProperty(method, 'name', { value: name, writable: false, enumerable: false, configurable: true });
  ZanoWallet.prototype[name as never] = method as never;
});

export class ZanoAppConfig<AppConfig extends JSONConstrain<AppConfig>> {
  constructor(
    readonly api: ZanoController,
    initial: DeepReadonly<AppConfig>,
    encryption_key?: string
  ) {
    this.#encryption_key = encryption_key ?? PlainWallet.generate_random_key(20);
    this.#app_config = initial;
    try {
      this.#update_app_config();
    } catch (error) {
      if (error instanceof ZanoNotFoundError) {
      } else {
        throw error;
      }
    }
  }

  #encryption_key: string;
  #app_config!: DeepReadonly<AppConfig>;
  #update_app_config() {
    const response = TypedJSON.parse(PlainWallet.get_appconfig(this.#encryption_key));
    if (
      typeof response === 'object' &&
      response !== null &&
      'jsonrpc' in response &&
      'error' in response &&
      typeof response.error === 'object' &&
      response.error !== null &&
      'code' in response.error
    ) {
      assertErrorCode(response);
    }
    this.#app_config = response as DeepReadonly<AppConfig>;
  }
  get(): DeepReadonly<AppConfig> {
    return this.#app_config;
  }
  set(next: DeepReadonly<AppConfig>) {
    const response = TypedJSON.parse(PlainWallet.set_appconfig(TypedJSON.stringify(next), this.#encryption_key));
    if (response.error) throw new ZanoFailedError(response.error.message);
    this.#app_config = next;
  }
}
