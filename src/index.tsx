import { NitroModules } from 'react-native-nitro-modules';
import type { PlatformUtils as IPlatformUtils, ReactNativeZano } from './ReactNativeZano.nitro';

export const Zano = NitroModules.createHybridObject<ReactNativeZano>('ReactNativeZano');
export const PlatformUtils = NitroModules.createHybridObject<IPlatformUtils>('PlatformUtils');
