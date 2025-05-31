import { NitroModules } from 'react-native-nitro-modules';
import type { IWalletRpc } from './wallet-rpc';

export const WalletRpc = NitroModules.createHybridObject<IWalletRpc>('WalletRpc');
