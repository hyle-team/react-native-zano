import type { HybridObject } from 'react-native-nitro-modules';
import { type JSONRpcErrorCodeApiReturnCode, type JSONRpcErrorCodeJsonRpcErrorCode, type JSONRpcErrorCodeWalletRpcErrorCode, type JSONRpcReturnCode } from '../asserts';
import { API_RETURN_CODE, type open_wallet_response, type wallet_info_extra } from '../entities';
import { type UnwrapTypedJSON } from '../utils/typed-json';
import type { DeepReadonly, IfWeb } from '../utils/types';
import type { IWalletRpc } from '../wallet-rpc';
import { type ZanoWalletFile } from './zano-wallet-file';
export declare class ZanoWallet implements DeepReadonly<open_wallet_response> {
    readonly file: ZanoWalletFile;
    readonly name: DeepReadonly<open_wallet_response>['name'];
    readonly pass: DeepReadonly<open_wallet_response>['pass'];
    readonly wallet_id: DeepReadonly<open_wallet_response>['wallet_id'];
    readonly recent_history: DeepReadonly<open_wallet_response>['recent_history'];
    readonly wi: DeepReadonly<open_wallet_response>['wi'];
    readonly wi_extended: DeepReadonly<wallet_info_extra> | undefined;
    readonly seed: DeepReadonly<open_wallet_response>['seed'];
    readonly recovered: DeepReadonly<open_wallet_response>['recovered'];
    readonly wallet_local_bc_size: DeepReadonly<open_wallet_response>['wallet_local_bc_size'];
    readonly wallet_file_size: DeepReadonly<open_wallet_response>['wallet_file_size'];
    constructor(file: ZanoWalletFile, response: open_wallet_response);
    update_wallet_info(): Promise<import("..").wallet_extended_info>;
    get_status(): Promise<import("..").wallet_sync_status_info>;
    reset_file_password(password: string): Promise<void>;
    sign_message(message: string): Promise<import("..").INVOKE_RPC_SIGN_MESSAGE_RESPONSE>;
    assets_whitelist_add(params: {
        asset_id: string;
    }): Promise<{
        status: API_RETURN_CODE.OK;
        asset_descriptor: import("..").asset_descriptor_base;
    }>;
    assets_whitelist_remove(params: {
        asset_id: string;
    }): Promise<{
        status: API_RETURN_CODE.OK;
    }>;
    store(): Promise<import("..").INVOKE_RPC_STORE_RESPONSE>;
    close(): Promise<void>;
}
type _ExtractResponse<T> = Exclude<UnwrapTypedJSON<T>, JSONRpcReturnCode | JSONRpcErrorCodeApiReturnCode | JSONRpcErrorCodeWalletRpcErrorCode | JSONRpcErrorCodeJsonRpcErrorCode>['result'];
type ExtractResponse<T> = T extends Promise<infer V> ? Promise<_ExtractResponse<V>> : IfWeb<_ExtractResponse<T>, Promise<_ExtractResponse<T>>>;
type WalletRpcWrappers = {
    [Name in Exclude<keyof IWalletRpc, keyof HybridObject | 'store' | 'assets_whitelist_add' | 'assets_whitelist_remove' | 'sign_message'>]: (params: UnwrapTypedJSON<Parameters<IWalletRpc[Name]>[1]>) => ExtractResponse<ReturnType<IWalletRpc[Name]>>;
};
export interface ZanoWallet extends WalletRpcWrappers {
}
export {};
//# sourceMappingURL=zano-wallet.d.ts.map