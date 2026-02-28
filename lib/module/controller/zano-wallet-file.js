"use strict";

import { assertJSONRpcErrorCode, assertJSONRpcReturnCode } from "../asserts.js";
import { PlainWallet } from "../plain-wallet/index.js";
import { TypedJSON } from "../utils/typed-json.js";
import { ZanoWallet } from "./zano-wallet.js";
export const wallets_by_files = new WeakMap();
export class ZanoWalletFile {
  constructor(api, name, response) {
    this.api = api;
    this.name = name;
    wallets_by_files.set(this, response ? new ZanoWallet(this, response) : null);
  }
  get wallet() {
    return wallets_by_files.get(this);
  }
  async open(password) {
    if (this.wallet) return this.wallet;
    const response = TypedJSON.parse(await PlainWallet.open(this.name, password));
    assertJSONRpcErrorCode(response);
    assertJSONRpcReturnCode(response);
    const wallet = new ZanoWallet(this, {
      ...response.result,
      name: this.name,
      pass: password
    });
    wallets_by_files.set(this, wallet);
    return wallet;
  }
}
//# sourceMappingURL=zano-wallet-file.js.map