"use strict";

import { assertErrorCodeApiReturnCode, assertJSONRpcErrorCode, assertJSONRpcReturnCode, assertStatusCodeApiReturnCode, errorWithResponse } from "../asserts.js";
import { CoreRpc } from "../core-rpc/index.js";
import { ZanoApiNotFoundError, ZanoWalletRpcWrongArgumentError } from "../errors.js";
import { PlainWallet } from "../plain-wallet/index.js";
import { GENERAL_INTERNAL_ERROR, ZanoLogLevel } from "../plain-wallet/enums.js";
import { PlatformUtils } from "../platform-utils/index.js";
import { TypedJSON } from "../utils/typed-json.js";
import { ZanoControllerAlreadyInitiated, ZanoControllerFailedToInitialize, ZanoControllerInvalidDaemonURL } from "./errors.js";
import { ZanoWallet } from "./zano-wallet.js";
import { wallets_by_files, ZanoWalletFile } from "./zano-wallet-file.js";
export class ZanoController {
  constructor(address = 'https://node.zano.org:443', log_level = ZanoLogLevel.DISABLED) {
    this.log_level = log_level;
    this.remote_node = address;
  }
  #init_result;
  async initialize() {
    if (this.#init_result) throw new ZanoControllerAlreadyInitiated();
    {
      const [host, port] = this.#remote_node;
      const response = await PlainWallet.init(host, port, await this.working_directory, this.#log_level);
      if (response === GENERAL_INTERNAL_ERROR.INIT) throw errorWithResponse(new ZanoControllerFailedToInitialize(), {
        response
      });
      const json = TypedJSON.parse(response);
      if (json.error) throw errorWithResponse(new ZanoControllerFailedToInitialize(json.error.message), response);
      this.#init_result = json.result.return_code;
    }
    TypedJSON.parse(await PlainWallet.get_wallet_files()).items?.forEach(name => {
      this.#wallet_files.set(name, new ZanoWalletFile(this, name));
    });
    {
      const response = TypedJSON.parse(await PlainWallet.get_opened_wallets());
      assertJSONRpcReturnCode(response);
      response.result?.forEach(file_response => {
        let file = this.#wallet_files.get(file_response.name);
        if (file === undefined) {
          this.#wallet_files.set(file_response.name, new ZanoWalletFile(this, file_response.name, file_response));
        } else {
          wallets_by_files.set(file, new ZanoWallet(file, file_response));
        }
      });
    }
  }
  async dispose() {
    if (!this.#init_result) return;
    this.#init_result = undefined;
    const response = TypedJSON.parse(await PlainWallet.reset());
    assertJSONRpcReturnCode(response);
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
  #log_level;
  get log_level() {
    return this.#log_level;
  }
  set log_level(next) {
    this.#log_level = next;
    if (this.#init_result !== undefined) PlainWallet.set_log_level(next);
  }
  #remote_node;
  get remote_node() {
    return this.#remote_node;
  }
  get remote_node_url() {
    const [host, port] = this.#remote_node;
    return `${host}:${port}`;
  }
  set remote_node(address) {
    let next;
    if (Array.isArray(address)) {
      next = address;
    } else if (address.startsWith('http:')) {
      const [host, port] = address.substring('http:'.length).split(':');
      if (!host) throw new ZanoControllerInvalidDaemonURL('invalid address passed');
      next = [`http:${host}`, port || '80'];
    } else if (address.startsWith('https:')) {
      const [host, port] = address.substring('https:'.length).split(':');
      if (!host) throw new ZanoControllerInvalidDaemonURL('invalid address passed');
      next = [`https:${host}`, port || '443'];
    } else {
      const [host, port] = address.split(':');
      if (!host || !port) throw new ZanoControllerInvalidDaemonURL('invalid address passed');
      next = [host, port];
    }
    const curr = this.#remote_node;
    if (curr && curr[0] === next[0] && curr[1] === next[1]) return;
    this.#remote_node = next;
    if (this.#init_result !== undefined) PlainWallet.reset_connection_url(this.remote_node_url);
  }
  async get_address_info(addr) {
    return TypedJSON.parse(await PlainWallet.get_address_info(addr));
  }
  async get_seed_phrase_info(seed_phrase, seed_password) {
    const response = TypedJSON.parse(await PlainWallet.get_seed_phrase_info(TypedJSON.stringify({
      seed_phrase,
      seed_password
    })));
    if (response.error_code === 'Wrong parameter') throw errorWithResponse(new ZanoWalletRpcWrongArgumentError(response.error_code), response);
    return response.response_data;
  }
  async get_connectivity_status() {
    const response = TypedJSON.parse(await PlainWallet.get_connectivity_status());
    assertJSONRpcReturnCode(response);
    return response.result;
  }
  get_current_tx_fee(priority) {
    return PlainWallet.get_current_tx_fee(priority);
  }
  get_logs_buffer() {
    return PlainWallet.get_logs_buffer();
  }
  async truncate_log() {
    const response = TypedJSON.parse(await PlainWallet.truncate_log());
    assertJSONRpcErrorCode(response);
  }
  async export_private_info(target_dir) {
    const response = TypedJSON.parse(await PlainWallet.get_export_private_info(target_dir));
    assertJSONRpcReturnCode(response);
  }
  async generate_random_key(length = 20) {
    return await PlainWallet.generate_random_key(length);
  }
  #wallet_files = new Map();
  get wallet_files() {
    return this.#wallet_files;
  }
  async delete_wallet_file(name) {
    const file = this.#wallet_files.get(name);
    if (!file) return;
    await file.wallet?.close();
    const response = TypedJSON.parse(await PlainWallet.delete_wallet(name));
    assertJSONRpcErrorCode(response);
    this.#wallet_files.delete(name);
  }
  async restore_wallet(name, wallet_password, seed, seed_password) {
    if (this.#wallet_files.has(name)) throw new ZanoControllerAlreadyInitiated('wallet file already exists');
    const response = TypedJSON.parse(await PlainWallet.restore(seed, name, wallet_password, seed_password));
    assertJSONRpcErrorCode(response);
    assertJSONRpcReturnCode(response);
    const file = new ZanoWalletFile(this, name, {
      ...response.result,
      name,
      pass: wallet_password
    });
    this.#wallet_files.set(name, file);
    return file.wallet;
  }
  async generate_wallet(name, password) {
    if (this.#wallet_files.has(name)) throw new ZanoControllerAlreadyInitiated('wallet file already exists');
    const response = TypedJSON.parse(await PlainWallet.generate(name, password));
    assertJSONRpcErrorCode(response);
    assertJSONRpcReturnCode(response);
    const file = new ZanoWalletFile(this, name, {
      ...response.result,
      name,
      pass: password
    });
    this.#wallet_files.set(name, file);
    return file.wallet;
  }
  daemon = new Proxy({}, {
    get(methods, method) {
      // @ts-expect-error
      if (methods[method]) return methods[method];
      // @ts-expect-error
      methods[method] = async params => {
        // @ts-expect-error
        const response = TypedJSON.parse(await CoreRpc[method](TypedJSON.stringify(params)));
        assertJSONRpcReturnCode(response);
        assertErrorCodeApiReturnCode(response);
        const body = TypedJSON.parse(CoreRpc.base64_decode(response.base64_body));
        assertJSONRpcErrorCode(body);
        if (body.error) throw body.error;
        const result = body.result;
        if (typeof result === 'object') {
          assertStatusCodeApiReturnCode(result, {
            NOT_FOUND: () => {
              switch (method) {
                case 'get_asset_info':
                  return new ZanoApiNotFoundError(`Asset with specified id(${params}) is not found`);
                case 'get_alias_by_address':
                  return new ZanoApiNotFoundError('No alises found');
                case 'get_alias_details':
                  return new ZanoApiNotFoundError('Alias not found');
                default:
                  return new ZanoApiNotFoundError();
              }
            }
          });
        }
        return result;
      };
      // @ts-expect-error
      return methods[method];
    }
  });
}
//# sourceMappingURL=zano-controller.js.map