import { NitroModules } from 'react-native-nitro-modules';
import type { IfWeb } from '../utils';
import type { PlatformUtils as IPlatformUtils } from './platform-utils.nitro';
import type { PlatformUtils as PlatformUtilsWeb } from './platform-utils.web';

export const PlatformUtils = NitroModules.createHybridObject<IPlatformUtils | IfWeb<typeof PlatformUtilsWeb>>('PlatformUtils');
