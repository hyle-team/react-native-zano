import { ZanoBindingError } from '../errors';
import type { ICoreRpc } from './core-rpc';

export const CoreRpc = new Proxy(
  {},
  {
    get(_, name) {
      if ('ZanoCoreRpc' in globalThis) return globalThis['ZanoCoreRpc' as never][name];
      throw new ZanoBindingError('Failed to find web based bindings for rn-zano');
    },
  }
) as ICoreRpc;
