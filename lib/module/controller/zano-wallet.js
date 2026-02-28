"use strict";

import { assertJSONRpcErrorCode, assertJSONRpcReturnCode, assertStatusCodeApiReturnCode, errorWithResponse } from "../asserts.js";
import { CoreRpc } from "../core-rpc/index.js";
import { API_RETURN_CODE } from "../entities.js";
import { ZanoApiFailError, ZanoApiInternalError, ZanoApiNotFoundError, ZanoApiWalletWrongIdError } from "../errors.js";
import { PlainWallet } from "../plain-wallet/index.js";
import { TypedJSON } from "../utils/typed-json.js";
import { WalletRpc } from "../wallet-rpc/index.js";
import { wallets_by_files } from "./zano-wallet-file.js";
export class ZanoWallet {
  constructor(file, response) {
    this.file = file;
    this.name = file.name;
    this.pass = response.pass;
    this.wallet_id = response.wallet_id;
    this.recent_history = response.recent_history;
    this.wi = response.wi;
    this.seed = response.seed;
    this.recovered = response.recovered;
    this.wallet_local_bc_size = response.wallet_local_bc_size;
    this.wallet_file_size = response.wallet_file_size;
  }
  async update_wallet_info() {
    const response = TypedJSON.parse(await PlainWallet.get_wallet_info(this.wallet_id));
    assertJSONRpcReturnCode(response);
    const {
      wi,
      wi_extended
    } = response.result;
    Object.defineProperty(this, 'wi', {
      value: wi,
      writable: false,
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(this, 'wi_extended', {
      value: wi_extended,
      writable: false,
      enumerable: true,
      configurable: true
    });
    return response.result;
  }
  async get_status() {
    const response = TypedJSON.parse(await PlainWallet.get_wallet_status(this.wallet_id));
    assertJSONRpcReturnCode(response);
    return response;
  }
  async reset_file_password(password) {
    const response = await PlainWallet.reset_wallet_password(this.wallet_id, password);
    if (response !== API_RETURN_CODE.OK) {
      if (response === API_RETURN_CODE.FAIL) throw errorWithResponse(new ZanoApiFailError(), {
        response
      });
      if (response === API_RETURN_CODE.WALLET_WRONG_ID) throw errorWithResponse(new ZanoApiWalletWrongIdError(), {
        response
      });
      assertJSONRpcReturnCode(TypedJSON.parse(response));
    }
    Object.defineProperty(this, 'pass', {
      value: password,
      writable: false,
      enumerable: true,
      configurable: true
    });
  }
  async sign_message(message) {
    const response = await callZanoWalletRpc('sign_message', this.wallet_id, {
      buff: CoreRpc.base64_encode(message)
    });
    return response;
  }
  async assets_whitelist_add(params) {
    const response = await callZanoWalletRpc('assets_whitelist_add', this.wallet_id, params);
    assertStatusCodeApiReturnCode(response, {
      NOT_FOUND: () => new ZanoApiNotFoundError(`Asset with specified id(${params.asset_id}) is not found`)
    });
    return response;
  }
  async assets_whitelist_remove(params) {
    const response = await callZanoWalletRpc('assets_whitelist_remove', this.wallet_id, params);
    assertStatusCodeApiReturnCode(response, {
      NOT_FOUND: () => new ZanoApiNotFoundError(`Asset with specified id(${params.asset_id}) is not found`)
    });
    return response;
  }
  async store() {
    const response = await callZanoWalletRpc('store', this.wallet_id, {});
    Object.defineProperty(this, 'wallet_file_size', {
      value: response.wallet_file_size,
      writable: false,
      enumerable: true,
      configurable: true
    });
    return response;
  }
  async close() {
    const response = TypedJSON.parse(await PlainWallet.close_wallet(this.wallet_id));
    assertJSONRpcReturnCode(response);
    const code = response.response;
    if (code !== API_RETURN_CODE.OK) {
      if (code === API_RETURN_CODE.WALLET_WRONG_ID) throw new ZanoApiWalletWrongIdError(), response;
      if (code === API_RETURN_CODE.INTERNAL_ERROR) throw new ZanoApiInternalError(), response;
      if (code.startsWith(`${API_RETURN_CODE.FAIL}:`)) throw new ZanoApiFailError(code.substring(`${API_RETURN_CODE.FAIL}:`.length)), response;
    }
    wallets_by_files.set(this.file, null);
  }
}
function callZanoWalletRpc(method, wallet_id, params) {
  const handleResponse = response => {
    if (response === API_RETURN_CODE.WALLET_WRONG_ID) throw errorWithResponse(new ZanoApiWalletWrongIdError(), {
      response
    });
    const json = TypedJSON.parse(response);
    assertJSONRpcErrorCode(json);
    assertJSONRpcReturnCode(json);
    return json.result;
  };
  const result = WalletRpc[method](wallet_id, TypedJSON.stringify(params));
  if (result instanceof Promise) {
    return result.then(handleResponse);
  }
  return handleResponse(result);
}
['getbalance', 'getaddress', 'get_wallet_info', 'get_recent_txs_and_info', 'get_recent_txs_and_info2', 'transfer',
// 'store',
'get_payments', 'get_bulk_payments', 'make_integrated_address', 'split_integrated_address', 'sweep_below', 'get_bare_outs_stats', 'sweep_bare_outs', 'sign_transfer', 'submit_transfer', 'search_for_transactions', 'search_for_transactions2', 'get_restore_info',
// 'get_seed_phrase_info',
'get_mining_history', 'register_alias', 'update_alias',
// 'contracts_send_proposal',
// 'contracts_accept_proposal',
// 'contracts_get_all',
// 'contracts_release',
// 'contracts_request_cancel',
// 'contracts_accept_cancel',
'marketplace_get_offers_ex', 'marketplace_push_offer', 'marketplace_push_update_offer', 'marketplace_cancel_offer',
// 'atomics_create_htlc_proposal',
// 'atomics_get_list_of_active_htlc',
// 'atomics_redeem_htlc',
// 'atomics_check_htlc_redeemed',
'ionic_swap_generate_proposal', 'ionic_swap_get_proposal_info', 'ionic_swap_accept_proposal', 'assets_whitelist_get',
// 'assets_whitelist_add',
// 'assets_whitelist_remove',
'deploy_asset', 'emit_asset', 'update_asset', 'burn_asset', 'send_ext_signed_asset_tx', 'attach_asset_descriptor', 'transfer_asset_ownership', 'mw_get_wallets', 'mw_select_wallet',
// 'sign_message',
'encrypt_data', 'decrypt_data'
// 'proxy_to_daemon',
].forEach(name => {
  const method = function (params) {
    return callZanoWalletRpc(name, this.wallet_id, params);
  };
  Object.defineProperty(method, 'name', {
    value: name,
    writable: false,
    enumerable: false,
    configurable: true
  });
  ZanoWallet.prototype[name] = method;
});
//# sourceMappingURL=zano-wallet.js.map