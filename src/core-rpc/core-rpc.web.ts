import { ZanoBindingError } from '../errors';
import type { Promisify } from '../utils';
import type { ICoreRpc } from './core-rpc.type';

export const CoreRpc = new Proxy(
  {
    base64_encode: (text: string) => btoa(text),
    base64_decode: (text: string) => atob(text),
  },
  {
    get(target, name) {
      if (name in target && target[name as never]) return target[name as never];
      if (!('ZanoCoreRpc' in globalThis)) throw new ZanoBindingError('Failed to find web based bindings for rn-zano ZanoCoreRpc');
      return globalThis['ZanoCoreRpc' as never][name];
    },
  }
) as Promisify<ICoreRpc, 'base64_decode' | 'base64_encode'>;
