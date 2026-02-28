"use strict";

import { ZanoBindingError } from "../errors.js";
export const CoreRpc = new Proxy({
  base64_encode: text => btoa(text),
  base64_decode: text => atob(text)
}, {
  get(target, name) {
    if (name in target && target[name]) return target[name];
    if (!('ZanoCoreRpc' in globalThis)) throw new ZanoBindingError('Failed to find web based bindings for rn-zano ZanoCoreRpc');
    return globalThis['ZanoCoreRpc'][name];
  }
});
//# sourceMappingURL=core-rpc.web.js.map