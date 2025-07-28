import { ZanoBindingError } from '../errors';
import type { PlatformUtils as IPlatformUtils } from './utils.nitro';

export const PlatformUtils = new Proxy(
  {},
  {
    get(_, name) {
      if ('ZanoPlatformUtils' in globalThis) return globalThis['ZanoPlatformUtils' as never][name];
      throw new ZanoBindingError('Failed to find web based bindings for rn-zano');
    },
  }
) as IPlatformUtils;
