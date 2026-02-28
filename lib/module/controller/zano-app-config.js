"use strict";

import { assertJSONRpcErrorCode, errorWithResponse } from "../asserts.js";
import { ZanoApiFailError } from "../errors.js";
import { PlainWallet } from "../plain-wallet/index.js";
import { TypedJSON } from "../utils/typed-json.js";
export class ZanoAppConfig {
  constructor(api, initial, encryption_key) {
    this.api = api;
    this.encryption_key = encryption_key ?? PlainWallet.generate_random_key(20);
    this.#app_config = initial;
  }
  #app_config;
  async initialize() {
    const response = TypedJSON.parse(await PlainWallet.get_appconfig(await this.encryption_key));
    if (typeof response === 'object' && response !== null && 'jsonrpc' in response && 'error' in response && typeof response.error === 'object' && response.error !== null && 'code' in response.error) {
      assertJSONRpcErrorCode(response);
    }
    this.#app_config = response;
  }
  get() {
    return this.#app_config;
  }
  async set(next) {
    const response = TypedJSON.parse(await PlainWallet.set_appconfig(TypedJSON.stringify(next), await this.encryption_key));
    if (response.error) throw errorWithResponse(new ZanoApiFailError(response.error.message), response);
    this.#app_config = next;
  }
}
//# sourceMappingURL=zano-app-config.js.map