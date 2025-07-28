import { ZanoBindingError } from '../errors';
import type { IPlainWallet } from './plain-wallet';

export const PlainWallet = new Proxy(
  {},
  {
    get(_, name) {
      if ('ZanoPlainWallet' in globalThis) return globalThis['ZanoPlainWallet' as never][name];
      throw new ZanoBindingError('Failed to find web based bindings for rn-zano');
    },
  }
) as IPlainWallet;
