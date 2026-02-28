import { NitroModules } from 'react-native-nitro-modules';
import type { IfWeb } from '../utils';
import type { ICoreRpc } from './core-rpc.type';
import type { CoreRpc as CoreRpcWeb } from './core-rpc.web';

export const CoreRpc = NitroModules.createHybridObject<ICoreRpc | IfWeb<typeof CoreRpcWeb>>('CoreRpc');
