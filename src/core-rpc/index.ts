import { NitroModules } from 'react-native-nitro-modules';
import type { ICoreRpc } from './core-rpc';

export const CoreRpc = NitroModules.createHybridObject<ICoreRpc>('CoreRpc');
