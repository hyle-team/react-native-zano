import { NitroModules } from 'react-native-nitro-modules';
import type { ICoreRpc } from './core-rpc.type';

export const CoreRpc = NitroModules.createHybridObject<ICoreRpc>('CoreRpc');
