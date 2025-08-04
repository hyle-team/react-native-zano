import { ZanoBindingError } from '../errors';
import type { IWalletRpc } from './wallet-rpc.type';

export const WalletRpc = new Proxy(
  {},
  {
    get(target, name) {
      if (name in target && target[name as never]) return target[name as never];
      if (!('ZanoWalletRpc' in globalThis)) throw new ZanoBindingError('Failed to find web based bindings for rn-zano ZanoWalletRpc');
      return globalThis['ZanoWalletRpc' as never][name];
    },
  }
) as IWalletRpc;
