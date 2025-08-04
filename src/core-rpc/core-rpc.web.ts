import { ZanoBindingError } from '../errors';
import type { ICoreRpc } from './core-rpc.type';

export const CoreRpc = new Proxy(
  {
    base64_encode: (text) => btoa(text) as never,
    base64_decode: (text) => atob(text) as never,
  } as Partial<ICoreRpc>,
  {
    get(target, name) {
      if (name in target && target[name as never]) return target[name as never];
      if (!('ZanoCoreRpc' in globalThis)) throw new ZanoBindingError('Failed to find web based bindings for rn-zano ZanoCoreRpc');
      return globalThis['ZanoCoreRpc' as never][name];
    },
  }
) as ICoreRpc;
