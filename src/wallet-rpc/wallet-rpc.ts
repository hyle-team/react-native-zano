import { NitroModules } from 'react-native-nitro-modules';
import type { IfWeb } from '../utils';
import type { IWalletRpc } from './wallet-rpc.type';
import type { WalletRpc as WalletRpcWeb } from './wallet-rpc.web';

export const WalletRpc = NitroModules.createHybridObject<IWalletRpc | IfWeb<typeof WalletRpcWeb>>('WalletRpc');
