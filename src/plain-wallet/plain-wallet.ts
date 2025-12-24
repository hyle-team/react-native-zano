import { NitroModules } from 'react-native-nitro-modules';
import type { IfWeb } from '../utils';
import type { IPlainWallet } from './plain-wallet.type';
import type { PlainWallet as PlainWalletWeb } from './plain-wallet.web';

export const PlainWallet = NitroModules.createHybridObject<IPlainWallet | IfWeb<typeof PlainWalletWeb>>('PlainWallet');
