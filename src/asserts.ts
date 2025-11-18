import { API_RETURN_CODE, WALLET_RPC_ERROR_CODE, type ErrorCode, type ReturnCode } from './entities';
import {
  ZanoApiBadArgInvalidJsonError,
  ZanoApiFailedError,
  ZanoApiInternalError,
  ZanoApiReturnCodeErrors,
  ZanoStatusError,
  ZanoWalletBusyError,
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

type ApiErrorCodes = Exclude<API_RETURN_CODE, API_RETURN_CODE.OK>;
function returnApiErrorToCode(return_code: ApiErrorCodes | (string & {}), message?: string) {
  if (!(return_code in ZanoApiReturnCodeErrors)) return new ZanoApiInternalError(message);
  const Error = ZanoApiReturnCodeErrors[return_code as ApiErrorCodes];
  return new Error(message);
}

export type ApiReturnCodeErrors =
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.FAIL>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.NOT_FOUND>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.ACCESS_DENIED>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.INTERNAL_ERROR>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.NOT_ENOUGH_MONEY>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.NOT_ENOUGH_OUTPUTS_FOR_MIXING>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.INTERNAL_ERROR_QUE_FULL>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.BAD_ARG>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.BAD_ARG_EMPTY_DESTINATIONS>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.BAD_ARG_WRONG_FEE>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.BAD_ARG_INVALID_ADDRESS>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.BAD_ARG_WRONG_AMOUNT>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.BAD_ARG_WRONG_PAYMENT_ID>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.BAD_ARG_INVALID_JSON>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.WRONG_PASSWORD>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.WALLET_WRONG_ID>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.WALLET_AUDITABLE_NOT_SUPPORTED>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.WALLET_FEE_TOO_LOW>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.FILE_NOT_FOUND>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.ALREADY_EXISTS>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.CANCELED>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.FILE_RESTORED>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.TRUE>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.FALSE>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.CORE_BUSY>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.OVERFLOW>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.BUSY>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.INVALID_FILE>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.WRONG_SEED>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.GENESIS_MISMATCH>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.DISCONNECTED>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.UNINITIALIZED>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.TX_IS_TOO_BIG>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.TX_REJECTED>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.HTLC_ORIGIN_HASH_MISSMATCHED>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.WRAP>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.MISSING_ZC_INPUTS>>
  | JSONRpcSuccessfulResponse<ReturnCode<`${API_RETURN_CODE.INTERNAL_ERROR} ${string}`>>;
export function assertApiReturnErrors<R extends object>(response: R): asserts response is Exclude<R, ApiReturnCodeErrors> {
  if (!('result' in response)) return;
  const { result } = response;
  if (typeof result !== 'object' || result === null || !('return_code' in result)) return;
  const { return_code } = result;
  if (typeof return_code !== 'string') return;
  if (return_code === API_RETURN_CODE.OK) return;
  if (return_code.startsWith(API_RETURN_CODE.INTERNAL_ERROR)) {
    const message = return_code.substring(`${API_RETURN_CODE.INTERNAL_ERROR} `.length);
    throw errorWithResponse(new ZanoApiInternalError(message), response);
  }
  throw errorWithResponse(returnApiErrorToCode(return_code), response);
}

export type ApiErrorCodeErrors =
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.FAIL>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.NOT_FOUND>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.ACCESS_DENIED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.INTERNAL_ERROR>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.NOT_ENOUGH_MONEY>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.NOT_ENOUGH_OUTPUTS_FOR_MIXING>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.INTERNAL_ERROR_QUE_FULL>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.BAD_ARG>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.BAD_ARG_EMPTY_DESTINATIONS>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.BAD_ARG_WRONG_FEE>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.BAD_ARG_INVALID_ADDRESS>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.BAD_ARG_WRONG_AMOUNT>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.BAD_ARG_WRONG_PAYMENT_ID>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.BAD_ARG_INVALID_JSON>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WRONG_PASSWORD>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WALLET_WRONG_ID>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WALLET_AUDITABLE_NOT_SUPPORTED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WALLET_FEE_TOO_LOW>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.FILE_NOT_FOUND>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.ALREADY_EXISTS>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.CANCELED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.FILE_RESTORED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.TRUE>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.FALSE>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.CORE_BUSY>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.OVERFLOW>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.BUSY>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.INVALID_FILE>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WRONG_SEED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.GENESIS_MISMATCH>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.DISCONNECTED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.UNINITIALIZED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.TX_IS_TOO_BIG>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.TX_REJECTED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.HTLC_ORIGIN_HASH_MISSMATCHED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WRAP>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.MISSING_ZC_INPUTS>>
  | JSONRpcFailedResponse<ErrorCode<`${API_RETURN_CODE.INTERNAL_ERROR}, DESCRIPTION: ${string}`>>
  | JSONRpcFailedResponse<ErrorCode<`${API_RETURN_CODE.FAIL}:${string}`>>;
export function assertApiErrorCode<R extends object>(response: R): asserts response is Exclude<R, ApiErrorCodeErrors> {
  if (!('error' in response)) return;
  const { error } = response;
  if (typeof error !== 'object' || error === null || !('code' in error)) return;
  const { code } = error;
  if (typeof code !== 'string') return;
  const message = 'message' in error ? String(error.message) || undefined : undefined;
  if (code.startsWith(API_RETURN_CODE.INTERNAL_ERROR)) {
    let description;
    if (message) {
      description = message;
    } else if (code.startsWith(`${API_RETURN_CODE.INTERNAL_ERROR}, DESCRIPTION: `)) {
      description = code.substring(`${API_RETURN_CODE.INTERNAL_ERROR}, DESCRIPTION: `.length);
    }
    throw errorWithResponse(new ZanoApiInternalError(description), response);
  }
  if (code.startsWith(API_RETURN_CODE.FAIL)) {
    let description;
    if (message) {
      description = message;
    } else if (code.startsWith(`${API_RETURN_CODE.FAIL}:`)) {
      description = code.substring(`${API_RETURN_CODE.FAIL}:`.length);
    }
    throw errorWithResponse(new ZanoApiInternalError(description), response);
  }
  throw errorWithResponse(returnApiErrorToCode(code, message), response);
}

// type WalletReturnErrorCodes = WALLET_RPC_ERROR_CODE;
function returnWalletErrorToCode(code: WALLET_RPC_ERROR_CODE | (string & {}), message?: string) {
  if (!(code in ZanoWalletRpcCodeErrors)) return new ZanoWalletRpcUnknownError(message);
  const Error = ZanoWalletRpcCodeErrors[code as WALLET_RPC_ERROR_CODE];
  return new Error(message);
}

export type WalletCodeErrors =
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR>>
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ADDRESS>>
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY>>
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR>>
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID>>
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT>>
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY>>
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET>>
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.INVALID_REQUEST>>
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.INVALID_PARAMS>>
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.PARSE_ERROR>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.NOT_FOUND>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WRONG_PASSWORD>>;
export function assertWalletRpcError<R extends object>(response: R): asserts response is Exclude<R, WalletCodeErrors> {
  if (!('error' in response)) return;
  const { error } = response;
  if (typeof error !== 'object' || error === null || !('code' in error)) return;
  const { code } = error;
  if (typeof code !== 'number') {
    if (code === API_RETURN_CODE.NOT_FOUND) throw errorWithResponse(new ZanoApiReturnCodeErrors[API_RETURN_CODE.NOT_FOUND](), response);
    if (code === API_RETURN_CODE.WRONG_PASSWORD) throw errorWithResponse(new ZanoApiReturnCodeErrors[API_RETURN_CODE.WRONG_PASSWORD](), response);
    return;
  }
  const message = 'message' in error ? String(error.message) || undefined : undefined;
  if (code === WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR) {
    if (message === API_RETURN_CODE.BUSY) throw errorWithResponse(new ZanoWalletBusyError(), response);
    throw errorWithResponse(new ZanoWalletRpcUnknownError(message), response);
  }
  throw errorWithResponse(returnWalletErrorToCode(code, message), response);
}

export type StatusFieldErrors = { [S in ApiErrorCodes]: { status: S } }[ApiErrorCodes];
type InferStatusErrors<R extends object> = R extends { status: infer S extends string } ? Exclude<S, API_RETURN_CODE.OK> : never;
export function assertStatusFieldErrors<R extends object>(
  response: R,
  messages: { [N in InferStatusErrors<R>]?: string | { (): Error } }
): asserts response is Exclude<R, StatusFieldErrors> {
  if (!('status' in response)) return;
  const { status } = response;
  if (typeof status !== 'string') return;
  if (status === API_RETURN_CODE.OK) return;
  const message = messages[status as InferStatusErrors<R>];
  const error = message === undefined || typeof message === 'string' ? new ZanoStatusError(status as API_RETURN_CODE, message) : message();
  throw errorWithResponse(error, response);
}

export type CoreCodeErrors = { error_code: API_RETURN_CODE.BAD_ARG_INVALID_JSON } | { error_code: API_RETURN_CODE.FAIL };
export function assertCoreRpcError<R extends object>(response: R): asserts response is Exclude<R, CoreCodeErrors> {
  if (!('error_code' in response)) return;
  const { error_code } = response;
  if (typeof error_code !== 'string') return;
  if (error_code === API_RETURN_CODE.BAD_ARG_INVALID_JSON) throw errorWithResponse(new ZanoApiBadArgInvalidJsonError(), response);
  if (error_code === API_RETURN_CODE.FAIL) throw errorWithResponse(new ZanoApiFailedError(), response);
  throw errorWithResponse(new ZanoApiFailedError(), response);
}
