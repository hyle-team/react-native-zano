"use strict";

import { ZanoBindingError } from "../errors.js";
export const PlatformUtils = new Proxy({}, {
  get(target, name) {
    if (name in target && target[name]) return target[name];
    if (!('ZanoPlatformUtils' in globalThis)) throw new ZanoBindingError('Failed to find web based bindings for rn-zano ZanoPlatformUtils');
    return globalThis['ZanoPlatformUtils'][name];
  }
});
//# sourceMappingURL=platform-utils.web.js.map