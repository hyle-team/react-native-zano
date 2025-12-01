import type { HybridObject } from 'react-native-nitro-modules';
import {
  assertApiErrorCode,
  assertApiReturnErrors,
  assertCoreRpcError,
  assertStatusFieldErrors,
  errorWithResponse,
  type ApiReturnCodeErrors,
  type CoreCodeErrors,
  type StatusFieldErrors,
} from '../asserts';
import type { ICoreRpc } from '../core-rpc';
import { CoreRpc } from '../core-rpc';
import { API_RETURN_CODE } from '../entities';
import { ZanoApiNotFoundError, ZanoWalletRpcWrongArgument } from '../errors';
import { PlainWallet } from '../plain-wallet';
import { GENERAL_INTERNAL_ERROR, ZanoLogLevel, ZanoPriority } from '../plain-wallet/enums';
import { PlatformUtils } from '../platform-utils';
import type { UnwrapTypedBase64 } from '../utils/typed-base64';
import { TypedJSON, type UnwrapTypedJSON } from '../utils/typed-json';
import { ZanoControllerAlreadyInitiated, ZanoControllerFailedToInitialize, ZanoControllerInvalidDaemonURL } from './errors';
import { ZanoWallet } from './zano-wallet';
import { wallets_by_files, ZanoWalletFile } from './zano-wallet-file';

export class ZanoController {
  constructor(address: string | [host: string, port: string] = 'https://node.zano.org:443', log_level = ZanoLogLevel.DISABLED) {
    this.log_level = log_level;
    this.remote_node = address;
  }

  #init_result: undefined | API_RETURN_CODE.OK | API_RETURN_CODE.ALREADY_EXISTS;
  async initialize() {
    if (this.#init_result) throw new ZanoControllerAlreadyInitiated();
    {
      const [host, port] = this.#remote_node;
      const response = await PlainWallet.init(host, port, PlatformUtils.get_working_directory(), this.#log_level);
      if (response === GENERAL_INTERNAL_ERROR.INIT) throw errorWithResponse(new ZanoControllerFailedToInitialize(), { response });
      const json = TypedJSON.parse(response);
      if (json.error) throw errorWithResponse(new ZanoControllerFailedToInitialize(json.error.message), response);
      this.#init_result = json.result.return_code;
    }

    TypedJSON.parse(await PlainWallet.get_wallet_files()).items?.forEach((name) => {
      this.#wallet_files.set(name, new ZanoWalletFile(this, name));
    });

    {
      const response = TypedJSON.parse(await PlainWallet.get_opened_wallets());
      assertApiReturnErrors(response);
      response.result?.forEach((file_response) => {
        let file = this.#wallet_files.get(file_response.name);
        if (file === undefined) {
          this.#wallet_files.set(file_response.name, new ZanoWalletFile(this, file_response.name, file_response));
        } else {
          wallets_by_files.set(file, new ZanoWallet(file, file_response));
        }
      });
    }
  }
  dispose() {
    if (!this.#init_result) return;
    this.#init_result = undefined;
    const response = TypedJSON.parse(PlainWallet.reset());
    assertApiReturnErrors(response);
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

  #log_level!: ZanoLogLevel;
  get log_level() {
    return this.#log_level;
  }
  set log_level(next: ZanoLogLevel) {
    this.#log_level = next;
    if (this.#init_result !== undefined) PlainWallet.set_log_level(next);
  }

  #remote_node!: [host: string, port: string];
  get remote_node() {
    return this.#remote_node;
  }
  set remote_node(address: string | [host: string, port: string]) {
    if (this.#init_result !== undefined) throw new ZanoControllerAlreadyInitiated();
    if (Array.isArray(address)) {
      this.#remote_node = address;
    } else if (address.startsWith('http:')) {
      const [host, port] = address.substring('http:'.length).split(':');
      if (!host) throw new ZanoControllerInvalidDaemonURL('invalid address passed');
      this.#remote_node = [`http:${host}`, port || '80'];
    } else if (address.startsWith('https:')) {
      const [host, port] = address.substring('https:'.length).split(':');
      if (!host) throw new ZanoControllerInvalidDaemonURL('invalid address passed');
      this.#remote_node = [`https:${host}`, port || '443'];
    } else {
      const [host, port] = address.split(':');
      if (!host || !port) throw new ZanoControllerInvalidDaemonURL('invalid address passed');
      this.#remote_node = [host, port];
    }
  }

  get_address_info(addr: string) {
    return TypedJSON.parse(PlainWallet.get_address_info(addr));
  }
  get_seed_phrase_info(seed_phrase: string, seed_password: string) {
    const response = TypedJSON.parse(PlainWallet.get_seed_phrase_info(TypedJSON.stringify({ seed_phrase, seed_password })));
    if (response.error_code === 'Wrong parameter') throw errorWithResponse(new ZanoWalletRpcWrongArgument(response.error_code), response);
    return response.response_data;
  }
  get_connectivity_status() {
    const response = TypedJSON.parse(PlainWallet.get_connectivity_status());
    assertApiReturnErrors(response);
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
    assertApiErrorCode(response);
  }
  async export_private_info(target_dir: string) {
    const response = TypedJSON.parse(await PlainWallet.get_export_private_info(target_dir));
    assertApiReturnErrors(response);
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
    assertApiErrorCode(response);
    this.#wallet_files.delete(name);
  }

  async restore_wallet(name: string, wallet_password: string, seed: string, seed_password: string) {
    if (this.#wallet_files.has(name)) throw new ZanoControllerAlreadyInitiated('wallet file already exists');
    const response = TypedJSON.parse(await PlainWallet.restore(seed, name, wallet_password, seed_password));
    assertApiErrorCode(response);
    assertApiReturnErrors(response);
    const file = new ZanoWalletFile(this, name, { ...response.result, name, pass: wallet_password });
    this.#wallet_files.set(name, file);
    return file.wallet!;
  }
  async generate_wallet(name: string, password: string) {
    if (this.#wallet_files.has(name)) throw new ZanoControllerAlreadyInitiated('wallet file already exists');
    const response = TypedJSON.parse(await PlainWallet.generate(name, password));
    assertApiErrorCode(response);
    assertApiReturnErrors(response);
    const file = new ZanoWalletFile(this, name, { ...response.result, name, pass: password });
    this.#wallet_files.set(name, file);
    return file.wallet!;
  }

  readonly daemon = (Object.keys(Object.getPrototypeOf(CoreRpc)) as Array<Exclude<keyof ICoreRpc, keyof HybridObject> | '__type'>).reduce(
    (methods, name) => {
      if (name === '__type') return methods;
      if (name === 'base64_encode' || name === 'base64_decode') return methods;
      methods[name] = (async (params: UnwrapTypedJSON<Parameters<ICoreRpc[typeof name]>[0]>) => {
        const response = TypedJSON.parse(await CoreRpc[name](TypedJSON.stringify(params) as never));
        assertApiReturnErrors(response);
        assertCoreRpcError(response);
        const body = TypedJSON.parse(CoreRpc.base64_decode(response.base64_body));
        assertApiErrorCode(body);
        if (body.error) throw body.error;
        const result = body.result;
        if (typeof result === 'object') {
          assertStatusFieldErrors(result, {
            NOT_FOUND: () => {
              switch (name) {
                case 'get_asset_info':
                  return new ZanoApiNotFoundError(`Asset with specified id(${params}) is not found`);
                case 'get_alias_by_address':
                  return new ZanoApiNotFoundError(`No alises found`);
                case 'get_alias_details':
                  return new ZanoApiNotFoundError(`Alias not found`);
                default:
                  return new ZanoApiNotFoundError();
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
              UnwrapTypedBase64<Exclude<UnwrapTypedJSON<Awaited<ReturnType<ICoreRpc[Name]>>>, ApiReturnCodeErrors | CoreCodeErrors>['base64_body']>
            >,
            { result: null }
          >['result'],
          StatusFieldErrors
        >
      >;
    }
  );
}
