import { ZanoBindingError } from '../errors';
import type { Promisify } from '../utils';
import type { PlatformUtils as IPlatformUtils } from './platform-utils.nitro';

export const PlatformUtils = new Proxy(
  {},
  {
    get(target, name) {
      if (name in target && target[name as never]) return target[name as never];
      if (!('ZanoPlatformUtils' in globalThis)) throw new ZanoBindingError('Failed to find web based bindings for rn-zano ZanoPlatformUtils');
      return globalThis['ZanoPlatformUtils' as never][name];
    },
  }
) as Promisify<IPlatformUtils>;
