import { NitroModules } from 'react-native-nitro-modules';
import type { PlatformUtils as IPlatformUtils } from './utils.nitro';

export const PlatformUtils = NitroModules.createHybridObject<IPlatformUtils>('PlatformUtils');
