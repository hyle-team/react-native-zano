import { NitroModules, type HybridObject } from 'react-native-nitro-modules';
import type { IWalletRpc } from './wallet-rpc';

let WalletRpc = NitroModules.createHybridObject<IWalletRpc>('WalletRpc');
if (__DEV__) {
  const methods = {} as Omit<IWalletRpc, keyof HybridObject>;
  WalletRpc = new Proxy(WalletRpc, {
    get(target, prop) {
      if (prop in methods) return methods[prop as never];
      const name = prop as keyof typeof methods;
      // @ts-expect-error
      methods[name] = (...params: any[]) => {
        let duration = performance.now();
        // @ts-expect-error
        const result = target[name](...params);
        duration = performance.now() - duration;
        console.log(`[ZANO][WalletRpc] ${name} call duration:`, duration);
        return result;
      };
      return Reflect.get(methods, name, WalletRpc);
    },
  });
}
export { WalletRpc };
