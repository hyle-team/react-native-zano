import type { HybridObject } from 'react-native-nitro-modules';
import { type ErrorCodeApiReturnCode, type JSONRpcReturnCode, type StatusCodeApiReturnCode } from '../asserts';
import type { ICoreRpc } from '../core-rpc';
import type { ZanoPriority } from '../plain-wallet/enums';
import { ZanoLogLevel } from '../plain-wallet/enums';
import type { UnwrapTypedBase64 } from '../utils/typed-base64';
import { type UnwrapTypedJSON } from '../utils/typed-json';
import { ZanoWallet } from './zano-wallet';
import { ZanoWalletFile } from './zano-wallet-file';
export declare class ZanoController {
    #private;
    constructor(address?: string | [host: string, port: string], log_level?: ZanoLogLevel);
    initialize(): Promise<void>;
    dispose(): Promise<void>;
    get lib_version(): `${number}.${number}.${number}.${number}[${string}]`;
    get working_directory(): string;
    get downloads_directory(): string;
    get log_level(): ZanoLogLevel;
    set log_level(next: ZanoLogLevel);
    get remote_node(): string | [host: string, port: string];
    get remote_node_url(): string;
    set remote_node(address: string | [host: string, port: string]);
    get_address_info(addr: string): Promise<{
        valid: boolean;
        auditable: boolean;
        payment_id: boolean;
        wrap: boolean;
    }>;
    get_seed_phrase_info(seed_phrase: string, seed_password: string): Promise<import("..").seed_phrase_info>;
    get_connectivity_status(): Promise<import("..").app_connectivity_status>;
    get_current_tx_fee(priority: ZanoPriority): number;
    get_logs_buffer(): Promise<string>;
    truncate_log(): Promise<void>;
    export_private_info(target_dir: string): Promise<void>;
    generate_random_key(length?: number): Promise<string>;
    get wallet_files(): ReadonlyMap<string, ZanoWalletFile>;
    delete_wallet_file(name: string): Promise<void>;
    restore_wallet(name: string, wallet_password: string, seed: string, seed_password: string): Promise<ZanoWallet>;
    generate_wallet(name: string, password: string): Promise<ZanoWallet>;
    readonly daemon: { [Name in Exclude<keyof ICoreRpc, keyof HybridObject | "base64_encode" | "base64_decode">]: (params: UnwrapTypedJSON<Parameters<ICoreRpc[Name]>[0]>) => Promise<Exclude<Exclude<UnwrapTypedJSON<UnwrapTypedBase64<Exclude<UnwrapTypedJSON<Awaited<ReturnType<ICoreRpc[Name]>>>, JSONRpcReturnCode | ErrorCodeApiReturnCode>["base64_body"]>>, {
        result: null;
    }>["result"], StatusCodeApiReturnCode>>; };
}
//# sourceMappingURL=zano-controller.d.ts.map