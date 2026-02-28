import { API_RETURN_CODE, WALLET_RPC_ERROR_CODE, type API_ERROR_CODE, type JSON_RPC_ERROR_CODE } from './entities';
import type { JSONRpcFailedResponse, JSONRpcSuccessfulResponse } from './utils/json-rpc';
export declare const errorWithResponse: (error: Error, response: object) => Error;
export declare const getErrorResponse: (error: Error) => object | undefined;
export type ReturnCode<Code extends string = API_RETURN_CODE> = {
    return_code: Code;
};
export type ErrorObj<Code = API_RETURN_CODE, Message extends string = string> = {
    code: Code;
    message?: Message;
};
export type StatusCode<Code = API_RETURN_CODE> = {
    status: Code;
};
export type ErrorCode<Code = API_RETURN_CODE> = {
    error_code: Code;
};
export type JSONRpcReturnCodeApiReturnCode = {
    [C in Extract<API_RETURN_CODE, string>]: JSONRpcSuccessfulResponse<ReturnCode<Extract<C, string>>>;
}[Extract<API_RETURN_CODE, string>];
export type JSONRpcReturnCodeUnknown = JSONRpcSuccessfulResponse<ReturnCode<string & {}>>;
export type JSONRpcReturnCode = JSONRpcReturnCodeApiReturnCode | JSONRpcReturnCodeUnknown;
type InferJSONRpcReturnCode<R extends object> = R extends JSONRpcSuccessfulResponse<ReturnCode<infer S extends string>> ? S : never;
export declare function assertJSONRpcReturnCode<R extends object>(response: R, messages?: {
    [N in InferJSONRpcReturnCode<R>]?: string | {
        (): Error;
    };
}): asserts response is Exclude<R, JSONRpcReturnCode>;
export type JSONRpcErrorCodeApiReturnCode = {
    [C in Extract<API_RETURN_CODE, string>]: JSONRpcFailedResponse<ErrorObj<Extract<C, string>>>;
}[Extract<API_RETURN_CODE, string>];
export type JSONRpcErrorCodeWalletRpcErrorCode = {
    [C in WALLET_RPC_ERROR_CODE]: JSONRpcFailedResponse<ErrorObj<C>>;
}[WALLET_RPC_ERROR_CODE];
export type JSONRpcErrorCodeJsonRpcErrorCode = {
    [C in JSON_RPC_ERROR_CODE]: JSONRpcFailedResponse<ErrorObj<C>>;
}[JSON_RPC_ERROR_CODE];
export type JSONRpcErrorCodeUnknown = JSONRpcFailedResponse<ErrorObj<string & {}>>;
export type JSONRpcErrorCode = JSONRpcErrorCodeApiReturnCode | JSONRpcErrorCodeWalletRpcErrorCode | JSONRpcErrorCodeJsonRpcErrorCode | JSONRpcErrorCodeUnknown;
type InferJSONRpcErrorCode<R extends object> = R extends JSONRpcFailedResponse<ErrorObj<infer S extends string | number>> ? S : never;
declare const JSONRpcError_base: {
    new (message?: string): {
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class JSONRpcError extends JSONRpcError_base {
    readonly code: unknown;
    constructor(code: unknown, message?: string);
}
export declare function assertJSONRpcErrorCode<R extends object>(response: R, messages?: {
    [N in InferJSONRpcErrorCode<R>]?: string | {
        (): Error;
    };
}): asserts response is Exclude<R, JSONRpcErrorCode>;
export type StatusCodeApiReturnCode = {
    [C in Extract<API_ERROR_CODE, string>]: StatusCode<Extract<C, string>>;
}[Extract<API_ERROR_CODE, string>];
type InferStatusErrors<R extends object> = R extends StatusCode<infer S extends string> ? S : never;
export declare function assertStatusCodeApiReturnCode<R extends object>(response: R, messages?: {
    [N in InferStatusErrors<R>]?: string | {
        (): Error;
    };
}): asserts response is Exclude<R, StatusCodeApiReturnCode>;
export type ErrorCodeApiReturnCode = {
    [C in Extract<API_RETURN_CODE, string>]: ErrorCode<Extract<C, string>>;
}[Extract<API_RETURN_CODE, string>];
type InferErrorCode<R extends object> = R extends ErrorCode<infer S extends string> ? S : never;
export declare function assertErrorCodeApiReturnCode<R extends object>(response: R, messages?: {
    [N in InferErrorCode<R>]?: string | {
        (): Error;
    };
}): asserts response is Exclude<R, ErrorCodeApiReturnCode>;
export {};
//# sourceMappingURL=asserts.d.ts.map