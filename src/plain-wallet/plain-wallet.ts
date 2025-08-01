import { ZanoBindingError } from '../errors';
import type { IPlainWallet } from './plain-wallet.type';

export const PlainWallet = new Proxy(
  {},
  {
    get(target, name) {
      if (name in target && target[name as never]) return target[name as never];
      if (!('ZanoPlainWallet' in globalThis)) throw new ZanoBindingError('Failed to find web based bindings for rn-zano ZanoPlainWallet');
      return globalThis['ZanoPlainWallet' as never][name];
    },
  }
) as IPlainWallet;
