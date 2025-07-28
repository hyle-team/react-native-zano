import type { PlatformUtils } from './platform-utils.nitro';

export interface IPlatformUtils extends PlatformUtils {
  get_working_directory(): string;
  get_downloads_directory(): string;
}
