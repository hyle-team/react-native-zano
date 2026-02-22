import { API_RETURN_CODE, WALLET_RPC_ERROR_CODE, type API_ERROR_CODE, type JSON_RPC_ERROR_CODE } from './entities';
import {
  createErrorClass,
  ZanoApiBadArgInvalidJsonError,
  ZanoApiInternalError,
  ZanoApiReturnCodeErrors,
  ZanoJsonRpcCodeErrors,
  ZanoWalletRpcCodeErrors,
  ZanoWalletRpcUnknownError,
} from './errors';
import type { JSONRpcFailedResponse, JSONRpcSuccessfulResponse } from './utils/json-rpc';

const responses = new WeakMap<Error, object>();
export const errorWithResponse = (error: Error, response: object) => {
  responses.set(error, response);
  return error;
};
export const getErrorResponse = (error: Error) => responses.get(error);

function returnApiErrorToCode(code: API_ERROR_CODE | (string & {}), message?: string) {
  if (!(code in ZanoApiReturnCodeErrors)) return new ZanoApiInternalError(message);
  const Error = ZanoApiReturnCodeErrors[code as API_ERROR_CODE];
  return new Error(message);
}
function returnJsonRpcErrorToCode(code: JSON_RPC_ERROR_CODE, message?: string) {
  if (!(code in ZanoJsonRpcCodeErrors)) return undefined;
  const Error = ZanoJsonRpcCodeErrors[code as JSON_RPC_ERROR_CODE];
  return new Error(message);
}
function returnWalletRpcErrorToCode(code: WALLET_RPC_ERROR_CODE, message?: string) {
  if (!(code in ZanoWalletRpcCodeErrors)) return new ZanoWalletRpcUnknownError(message);
  if (code === WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR) {
    if (message) return returnApiErrorToCode(message);
    return new ZanoWalletRpcUnknownError(message);
  }
  const Error = ZanoWalletRpcCodeErrors[code as WALLET_RPC_ERROR_CODE];
  return new Error(message);
}

export type ReturnCode<Code extends string = API_RETURN_CODE> = { return_code: Code };
export type ErrorObj<Code = API_RETURN_CODE, Message extends string = string> = { code: Code; message?: Message };
export type StatusCode<Code = API_RETURN_CODE> = { status: Code };
export type ErrorCode<Code = API_RETURN_CODE> = { error_code: Code };

export type JSONRpcReturnCodeApiReturnCode = {
  [C in Extract<API_RETURN_CODE, string>]: JSONRpcSuccessfulResponse<ReturnCode<Extract<C, string>>>;
}[Extract<API_RETURN_CODE, string>];
export type JSONRpcReturnCodeUnknown = JSONRpcSuccessfulResponse<ReturnCode<string & {}>>;
export type JSONRpcReturnCode = JSONRpcReturnCodeApiReturnCode | JSONRpcReturnCodeUnknown;
type InferJSONRpcReturnCode<R extends object> = R extends JSONRpcSuccessfulResponse<ReturnCode<infer S extends string>> ? S : never;
export function assertJSONRpcReturnCode<R extends object>(
  response: R,
  messages?: { [N in InferJSONRpcReturnCode<R>]?: string | { (): Error } }
): asserts response is Exclude<R, JSONRpcReturnCode> {
  if (!('result' in response)) return;
  const { result } = response;
  if (typeof result !== 'object' || result === null || !('return_code' in result)) return;
  const { return_code } = result;
  if (typeof return_code !== 'string') return;
  if (return_code === API_RETURN_CODE.OK) return;
  const message = messages?.[return_code as InferJSONRpcReturnCode<R>];
  if (typeof message === 'function') throw errorWithResponse(message(), response);
  throw errorWithResponse(returnApiErrorToCode(return_code, message), response);
}

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
export type JSONRpcErrorCode =
  | JSONRpcErrorCodeApiReturnCode
  | JSONRpcErrorCodeWalletRpcErrorCode
  | JSONRpcErrorCodeJsonRpcErrorCode
  | JSONRpcErrorCodeUnknown;
export class JSONRpcError extends createErrorClass('JSONRpcError') {
  constructor(
    readonly code: unknown,
    message?: string
  ) {
    super(message);
  }
}
type InferJSONRpcErrorCode<R extends object> = R extends JSONRpcFailedResponse<ErrorObj<infer S extends string | number>> ? S : never;
export function assertJSONRpcErrorCode<R extends object>(
  response: R,
  messages?: { [N in InferJSONRpcErrorCode<R>]?: string | { (): Error } }
): asserts response is Exclude<R, JSONRpcErrorCode> {
  if (!('error' in response)) return;
  const { error } = response;
  if (typeof error !== 'object' || error === null || !('code' in error)) return;
  const { code } = error;
  const message = messages?.[code as InferJSONRpcErrorCode<R>] ?? ('message' in error ? String(error.message) || undefined : undefined);
  if (typeof message === 'function') throw errorWithResponse(message(), response);
  if (typeof code === 'string') {
    throw errorWithResponse(returnApiErrorToCode(code, message), response);
  }
  if (typeof code === 'number') {
    const inst = returnJsonRpcErrorToCode(code, message) ?? returnWalletRpcErrorToCode(code, message);
    throw errorWithResponse(inst, response);
  }
  throw errorWithResponse(new JSONRpcError(code, message), response);
}

export type StatusCodeApiReturnCode = {
  [C in Extract<API_ERROR_CODE, string>]: StatusCode<Extract<C, string>>;
}[Extract<API_ERROR_CODE, string>];
type InferStatusErrors<R extends object> = R extends StatusCode<infer S extends string> ? S : never;
export function assertStatusCodeApiReturnCode<R extends object>(
  response: R,
  messages?: { [N in InferStatusErrors<R>]?: string | { (): Error } }
): asserts response is Exclude<R, StatusCodeApiReturnCode> {
  if (!('status' in response)) return;
  const { status } = response;
  if (typeof status !== 'string') return;
  if (status === API_RETURN_CODE.OK) return;
  const message = messages?.[status as InferStatusErrors<R>];
  if (typeof message === 'function') throw errorWithResponse(message(), response);
  throw errorWithResponse(returnApiErrorToCode(status, message), response);
}

export type ErrorCodeApiReturnCode = {
  [C in Extract<API_RETURN_CODE, string>]: ErrorCode<Extract<C, string>>;
}[Extract<API_RETURN_CODE, string>];
type InferErrorCode<R extends object> = R extends ErrorCode<infer S extends string> ? S : never;
export function assertErrorCodeApiReturnCode<R extends object>(
  response: R,
  messages?: { [N in InferErrorCode<R>]?: string | { (): Error } }
): asserts response is Exclude<R, ErrorCodeApiReturnCode> {
  if (!('error_code' in response)) return;
  const { error_code } = response;
  if (typeof error_code !== 'string') return;
  const message = messages?.[error_code as InferErrorCode<R>];
  if (typeof message === 'function') throw errorWithResponse(message(), response);
  if (error_code === API_RETURN_CODE.BAD_ARG_INVALID_JSON) throw errorWithResponse(new ZanoApiBadArgInvalidJsonError(), response);
  throw errorWithResponse(returnApiErrorToCode(error_code), response);
}
