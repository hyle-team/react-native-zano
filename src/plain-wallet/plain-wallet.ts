import { NitroModules } from 'react-native-nitro-modules';
import type { IPlainWallet } from './plain-wallet.type';

export const PlainWallet = NitroModules.createHybridObject<IPlainWallet>('PlainWallet');
