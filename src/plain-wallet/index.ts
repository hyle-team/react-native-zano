import { NitroModules, type HybridObject } from 'react-native-nitro-modules';
import type { IPlainWallet } from './plain-wallet';

let PlainWallet = NitroModules.createHybridObject<IPlainWallet>('PlainWallet');
if (__DEV__) {
  const methods = {} as Omit<IPlainWallet, keyof HybridObject>;
  PlainWallet = new Proxy(PlainWallet, {
    get(target, prop) {
      if (prop in methods) return methods[prop as never];
      const name = prop as keyof typeof methods;
      // @ts-expect-error
      methods[name] = (...params: any[]) => {
        let duration = performance.now();
        // @ts-expect-error
        const result = target[name](...params);
        duration = performance.now() - duration;
        console.log(`[ZANO][PlainWallet] ${name} call duration:`, duration);
        return result;
      };
      return Reflect.get(methods, name, PlainWallet);
    },
  });
}
export { PlainWallet };

export * from './enums';
