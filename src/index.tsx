import { NitroModules } from 'react-native-nitro-modules';
import type { ReactNativeZano } from './ReactNativeZano.nitro';

const ReactNativeZanoHybridObject =
  NitroModules.createHybridObject<ReactNativeZano>('ReactNativeZano');

export function multiply(a: number, b: number): number {
  return ReactNativeZanoHybridObject.multiply(a, b);
}
