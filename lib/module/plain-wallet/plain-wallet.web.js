"use strict";

import { ZanoBindingError } from "../errors.js";
export const PlainWallet = new Proxy({}, {
  get(target, name) {
    if (name in target && target[name]) return target[name];
    if (!('ZanoPlainWallet' in globalThis)) throw new ZanoBindingError('Failed to find web based bindings for rn-zano ZanoPlainWallet');
    return globalThis['ZanoPlainWallet'][name];
  }
});
//# sourceMappingURL=plain-wallet.web.js.map