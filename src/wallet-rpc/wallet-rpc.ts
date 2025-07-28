import { ZanoBindingError } from '../errors';
import type { IWalletRpc } from './wallet-rpc.type';

export const WalletRpc = new Proxy(
  {},
  {
    get(_, name) {
      if ('ZanoWalletRpc' in globalThis) return globalThis['ZanoWalletRpc' as never][name];
      throw new ZanoBindingError('Failed to find web based bindings for rn-zano');
    },
  }
) as IWalletRpc;
