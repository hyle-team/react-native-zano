import type { HybridObject } from 'react-native-nitro-modules';

export interface ReactNativeZano extends HybridObject<{ ios: 'c++'; android: 'c++' }> {
  init_zano(ip: string, port: string, working_folder: string, log_level: number): string;
}
