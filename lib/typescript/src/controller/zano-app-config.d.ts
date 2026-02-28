import type { DeepReadonly } from '../utils/types';
import type { ZanoController } from './zano-controller';
export declare class ZanoAppConfig<AppConfig> {
    #private;
    readonly api: ZanoController;
    constructor(api: ZanoController, initial: DeepReadonly<AppConfig>, encryption_key?: string);
    encryption_key: string | Promise<string>;
    initialize(): Promise<void>;
    get(): DeepReadonly<AppConfig>;
    set(next: DeepReadonly<AppConfig>): Promise<void>;
}
//# sourceMappingURL=zano-app-config.d.ts.map