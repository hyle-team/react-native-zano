"use strict";

import { ZanoBindingError } from "../errors.js";
export const WalletRpc = new Proxy({}, {
  get(target, name) {
    if (name in target && target[name]) return target[name];
    if (!('ZanoWalletRpc' in globalThis)) throw new ZanoBindingError('Failed to find web based bindings for rn-zano ZanoWalletRpc');
    return globalThis['ZanoWalletRpc'][name];
  }
});
//# sourceMappingURL=wallet-rpc.web.js.map