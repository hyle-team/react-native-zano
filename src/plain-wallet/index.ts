import { NitroModules } from 'react-native-nitro-modules';
import type { IPlainWallet } from './plain-wallet';

export const PlainWallet = NitroModules.createHybridObject<IPlainWallet>('PlainWallet');
