import type { HybridObject } from 'react-native-nitro-modules';
import { API_RETURN_CODE, type open_wallet_response, type wallet_info_extra } from './entities';
import {
  assertErrorCode,
  assertReturnErrors,
  assertWalletRpcError,
  ZanoAlreadyExistsError,
  ZanoFailedError,
  ZanoInitializeError,
  ZanoInternalError,
  ZanoNotFoundError,
  ZanoUninitializedError,
  ZanoWrongWalletIdError,
  type ErrorCodeErrors,
  type ReturnCodeErrors,
  type WalletCodeErrors,
} from './errors';
import { PlainWallet } from './plain-wallet';
import { GENERAL_INTERNAL_ERROR, ZanoLogLevel, ZanoPriority } from './plain-wallet/enums';
import { PlatformUtils } from './platform';
import { TypedJSON, type JSONConstrain, type UnwrapTypedJSON } from './utils/typed-json';
import type { DeepReadonly } from './utils/types';
import { WalletRpc } from './wallet-rpc';
import type { IWalletRpc } from './wallet-rpc/wallet-rpc';

export interface ZanoApi {}
export class ZanoApi {
  constructor(address: string = 'https://node.zano.org:443', log_level = ZanoLogLevel.DISABLED) {
    this.#log_level = log_level;
    this.#remote_node = address;

    TypedJSON.parse(PlainWallet.get_wallet_files()).items?.forEach((wallet_name) =>
      this.#wallet_files.set(wallet_name, new ZanoWalletFile(this, wallet_name))
    );
  }

  #init_result: undefined | API_RETURN_CODE.OK | API_RETURN_CODE.ALREADY_EXISTS;
  async initialize() {
    if (this.#init_result) throw new ZanoAlreadyExistsError();
    const response = await PlainWallet.init(this.#remote_node, PlatformUtils.get_working_directory(), this.#log_level);
    if (response === GENERAL_INTERNAL_ERROR.INIT) throw new ZanoInitializeError();
    const json = TypedJSON.parse(response);
    if (json.error) throw new ZanoInternalError(json.error.message);
    this.#init_result = json.result.return_code;
  }
  dispose() {
    if (!this.#init_result) throw new ZanoUninitializedError();
    const response = TypedJSON.parse(PlainWallet.reset());
    assertReturnErrors(response);
  }

  get lib_version() {
    return PlainWallet.get_version();
  }

  #log_level: ZanoLogLevel;
  get log_level() {
    return this.#log_level;
  }
  set log_level(next: ZanoLogLevel) {
    PlainWallet.set_log_level(next);
  }

  #remote_node: string;
  get remote_node() {
    return this.#remote_node;
  }
  set remote_node(address: string) {
    this.#remote_node = address;
    PlainWallet.reset_connection_url(address);
  }

  get_address_info(addr: string) {
    return TypedJSON.parse(PlainWallet.get_address_info(addr));
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
  truncate_log() {
    const response = TypedJSON.parse(PlainWallet.truncate_log());
    assertErrorCode(response);
  }
  export_private_info() {
    const response = TypedJSON.parse(PlainWallet.get_export_private_info());
    assertReturnErrors(response);
  }
  generate_random_key(length = 20) {
    return PlainWallet.generate_random_key(length);
  }

  #wallet_files = new Map<string, ZanoWalletFile>();
  get wallet_files(): ReadonlyMap<string, ZanoWalletFile> {
    return this.#wallet_files;
  }
  delete_wallet_file(wallet_name: string) {
    if (this.#wallet_files.delete(wallet_name)) {
      const response = TypedJSON.parse(PlainWallet.delete_wallet(wallet_name));
      assertErrorCode(response);
    }
  }

  get_opened_wallets(): ZanoWallet[] {
    const response = TypedJSON.parse(PlainWallet.get_opened_wallets());
    assertReturnErrors(response);
    if (!response.result) return [];
    return response.result.map((response) => {
      let file = this.#wallet_files.get(response.name);
      if (file === undefined) {
        file = new ZanoWalletFile(this, response.name, response);
        this.#wallet_files.set(response.name, file);
      } else if (!file.wallet) {
        file.handleOpened(response);
      }
      return file.wallet!;
    });
  }
  restore_wallet(wallet_name: string, wallet_password: string, seed: string, seed_password: string) {
    if (this.#wallet_files.has(wallet_name)) throw new ZanoAlreadyExistsError('wallet file already exists');
    const response = TypedJSON.parse(PlainWallet.restore(seed, wallet_name, wallet_password, seed_password));
    assertErrorCode(response);
    assertReturnErrors(response);
    const file = new ZanoWalletFile(this, wallet_name, response.result);
    this.#wallet_files.set(wallet_name, file);
    return file.wallet!;
  }
  generate_wallet(wallet_name: string, password: string) {
    if (this.#wallet_files.has(wallet_name)) throw new ZanoAlreadyExistsError('wallet file already exists');
    const response = TypedJSON.parse(PlainWallet.generate(wallet_name, password));
    assertErrorCode(response);
    assertReturnErrors(response);
    const file = new ZanoWalletFile(this, wallet_name, response.result);
    this.#wallet_files.set(wallet_name, file);
    return file.wallet!;
  }
}

export class ZanoWalletFile {
  constructor(
    readonly api: ZanoApi,
    readonly wallet_name: string,
    response?: open_wallet_response
  ) {
    this.#wallet = response ? new ZanoWallet(this, response) : null;
  }
  #wallet: ZanoWallet | null = null;
  get wallet() {
    return this.#wallet;
  }

  handleOpened(response: open_wallet_response) {
    if (this.#wallet) return;
    this.#wallet = new ZanoWallet(this, response);
  }
  async open(password: string) {
    if (this.#wallet) return;
    const response = TypedJSON.parse(await PlainWallet.open(this.wallet_name, password));
    assertErrorCode(response);
    assertReturnErrors(response);
    this.#wallet = new ZanoWallet(this, { ...response.result, name: this.wallet_name, pass: password });
    return this.#wallet;
  }
}

type WalletRpcWrappers = {
  [Name in Exclude<keyof IWalletRpc, keyof HybridObject>]: (
    params: UnwrapTypedJSON<Parameters<IWalletRpc[Name]>[1]>
  ) => Exclude<UnwrapTypedJSON<ReturnType<IWalletRpc[Name]>>, ReturnCodeErrors | ErrorCodeErrors | WalletCodeErrors>;
};
export interface ZanoWallet extends WalletRpcWrappers {}
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

  update_wallet_info() {
    const response = TypedJSON.parse(PlainWallet.get_wallet_info(this.wallet_id));
    assertReturnErrors(response);
    const { wi, wi_extended } = response.result;
    Object.defineProperty(this, 'wi', { value: wi, writable: false, enumerable: true, configurable: true });
    Object.defineProperty(this, 'wi_extended', { value: wi_extended, writable: false, enumerable: true, configurable: true });
    return response.result;
  }

  get_status() {
    const response = TypedJSON.parse(PlainWallet.get_wallet_status(this.wallet_id));
    assertReturnErrors(response);
    return response.result;
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

  close() {
    const response = TypedJSON.parse(PlainWallet.close_wallet(this.wallet_id));
    assertReturnErrors(response);
    const code = response.result.response;
    if (code !== API_RETURN_CODE.OK) {
      if (code === API_RETURN_CODE.WALLET_WRONG_ID) throw new ZanoWrongWalletIdError();
      if (code === API_RETURN_CODE.INTERNAL_ERROR) throw new ZanoInternalError();
      if (code.startsWith(`${API_RETURN_CODE.FAIL}:`)) throw new ZanoFailedError(code.substring(`${API_RETURN_CODE.FAIL}:`.length));
    }
    (this.file.api.wallet_files as Map<string, ZanoWalletFile>).delete(this.name);
  }
}
Object.keys(Object.getPrototypeOf(WalletRpc))
  .filter((name) => name !== '__type')
  .forEach((name) => {
    const method = function <Name extends Exclude<keyof IWalletRpc, keyof HybridObject>>(
      this: ZanoWallet,
      params: UnwrapTypedJSON<Parameters<IWalletRpc[Name]>[1]>
    ) {
      const response = WalletRpc[name as Name](this.wallet_id, TypedJSON.stringify(params as never));
      if (response === API_RETURN_CODE.WALLET_WRONG_ID) throw new ZanoWrongWalletIdError();
      const json = TypedJSON.parse(response);
      assertErrorCode(json);
      assertReturnErrors(json);
      assertWalletRpcError(json);
      return json.result;
    };
    Object.defineProperty(method, 'name', { value: name, writable: false, enumerable: false, configurable: true });
    ZanoWallet.prototype[name as never] = method as never;
  });

export class ZanoAppConfig<AppConfig extends JSONConstrain<AppConfig>> {
  constructor(
    readonly api: ZanoApi,
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
