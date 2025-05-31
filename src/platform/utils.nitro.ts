import type { HybridObject } from 'react-native-nitro-modules';

export interface PlatformUtils extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  get_working_directory(): string;
  get_downloads_directory(): string;
}
