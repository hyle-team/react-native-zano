import { API_RETURN_CODE, WALLET_RPC_ERROR_CODE, type ErrorCode, type ReturnCode } from './entities';
import {
  ZanoAlreadyExistsError,
  ZanoCoreBadArgumentError,
  ZanoFailedError,
  ZanoInternalError,
  ZanoInvalidFileError,
  ZanoNotFoundError,
  ZanoStatusError,
  ZanoUninitializedError,
  ZanoWalletBusyError,
  ZanoWalletRpcDaemonIsBusyError,
  ZanoWalletRpcGenericTransferError,
  ZanoWalletRpcNotEnoughMoneyError,
  ZanoWalletRpcUnknownError,
  ZanoWalletRpcWrongAddressError,
  ZanoWalletRpcWrongArgumentError,
  ZanoWalletRpcWrongMixinsForAuditableWalletError,
  ZanoWalletRpcWrongPaymentIdError,
  ZanoWatchOnlyWalletNotSupported,
  ZanoWrongPasswordError,
  ZanoWrongSeedError,
} from './errors';
import type { JSONRpcFailedResponse, JSONRpcSuccessfulResponse } from './utils/json-rpc';

const responses = new WeakMap<Error, object>();
export const errorWithResponse = (error: Error, response: object) => {
  responses.set(error, response);
  return error;
};
export const getErrorResponse = (error: Error) => responses.get(error);

export type ReturnCodeErrors =
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.UNINITIALIZED>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.INTERNAL_ERROR>>
  | JSONRpcSuccessfulResponse<ReturnCode<`${API_RETURN_CODE.INTERNAL_ERROR} ${string}`>>
  | JSONRpcSuccessfulResponse<ReturnCode<API_RETURN_CODE.FAIL>>;
export function assertReturnErrors<R extends object>(response: R): asserts response is Exclude<R, ReturnCodeErrors> {
  if (!('result' in response)) return;
  const { result } = response;
  if (typeof result !== 'object' || result === null || !('return_code' in result)) return;
  const { return_code } = result;
  if (typeof return_code !== 'string') return;
  if (return_code === API_RETURN_CODE.UNINITIALIZED) throw errorWithResponse(new ZanoUninitializedError(), response);
  if (return_code === API_RETURN_CODE.INTERNAL_ERROR) throw errorWithResponse(new ZanoInternalError(), response);
  if (return_code.startsWith(API_RETURN_CODE.INTERNAL_ERROR)) {
    const message = return_code.substring(`${API_RETURN_CODE.INTERNAL_ERROR} `.length);
    throw errorWithResponse(new ZanoInternalError(message), response);
  }
  if (return_code === API_RETURN_CODE.FAIL) throw errorWithResponse(new ZanoFailedError(), response);
}

export type ErrorCodeErrors =
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.NOT_FOUND>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WRONG_PASSWORD>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.INVALID_FILE>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.ALREADY_EXISTS>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.FILE_NOT_FOUND>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WRONG_SEED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.UNINITIALIZED>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.INTERNAL_ERROR>>
  | JSONRpcFailedResponse<ErrorCode<`${API_RETURN_CODE.INTERNAL_ERROR}, DESCRIPTION: ${string}`>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.FAIL>>
  | JSONRpcFailedResponse<ErrorCode<`${API_RETURN_CODE.FAIL}:${string}`>>;
export function assertErrorCode<R extends object>(response: R): asserts response is Exclude<R, ErrorCodeErrors> {
  if (!('error' in response)) return;
  const { error } = response;
  if (typeof error !== 'object' || error === null || !('code' in error)) return;
  const { code } = error;
  if (typeof code !== 'string') return;
  const message = 'message' in error ? String(error.message) || undefined : undefined;
  if (code === API_RETURN_CODE.NOT_FOUND) throw errorWithResponse(new ZanoNotFoundError(message), response);
  if (code === API_RETURN_CODE.WRONG_PASSWORD) throw errorWithResponse(new ZanoWrongPasswordError(message), response);
  if (code === API_RETURN_CODE.INVALID_FILE) throw errorWithResponse(new ZanoInvalidFileError(message), response);
  if (code === API_RETURN_CODE.ALREADY_EXISTS) throw errorWithResponse(new ZanoAlreadyExistsError(message), response);
  if (code === API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED) throw errorWithResponse(new ZanoWatchOnlyWalletNotSupported(message), response);
  if (code === API_RETURN_CODE.FILE_NOT_FOUND) throw errorWithResponse(new ZanoNotFoundError(message), response);
  if (code === API_RETURN_CODE.WRONG_SEED) throw errorWithResponse(new ZanoWrongSeedError(message), response);
  if (code === API_RETURN_CODE.UNINITIALIZED) throw errorWithResponse(new ZanoUninitializedError(message), response);
  if (code.startsWith(API_RETURN_CODE.INTERNAL_ERROR)) {
    let description;
    if (message) {
      description = message;
    } else if (code.startsWith(`${API_RETURN_CODE.INTERNAL_ERROR}, DESCRIPTION: `)) {
      description = code.substring(`${API_RETURN_CODE.INTERNAL_ERROR}, DESCRIPTION: `.length);
    }
    throw errorWithResponse(new ZanoInternalError(description), response);
  }
  if (code.startsWith(API_RETURN_CODE.FAIL)) {
    let description;
    if (message) {
      description = message;
    } else if (code.startsWith(`${API_RETURN_CODE.FAIL}:`)) {
      description = code.substring(`${API_RETURN_CODE.FAIL}:`.length);
    }
    throw errorWithResponse(new ZanoInternalError(description), response);
  }
}

export type WalletCodeErrors =
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.NOT_FOUND>>
  | JSONRpcFailedResponse<ErrorCode<API_RETURN_CODE.WRONG_PASSWORD>>
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
  | JSONRpcFailedResponse<ErrorCode<WALLET_RPC_ERROR_CODE.PARSE_ERROR>>;
export function assertWalletRpcError<R extends object>(response: R): asserts response is Exclude<R, WalletCodeErrors> {
  if (!('error' in response)) return;
  const { error } = response;
  if (typeof error !== 'object' || error === null || !('code' in error)) return;
  const { code } = error;
  if (typeof code !== 'number') return;
  const message = 'message' in error ? String(error.message) || undefined : undefined;
  if (code === WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR) {
    if (message === API_RETURN_CODE.BUSY) throw errorWithResponse(new ZanoWalletBusyError(), response);
    throw errorWithResponse(new ZanoWalletRpcUnknownError(message), response);
  }
  if (code === WALLET_RPC_ERROR_CODE.WRONG_ADDRESS) throw errorWithResponse(new ZanoWalletRpcWrongAddressError(message), response);
  if (code === WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY) throw errorWithResponse(new ZanoWalletRpcDaemonIsBusyError(message), response);
  if (code === WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR) throw errorWithResponse(new ZanoWalletRpcGenericTransferError(message), response);
  if (code === WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID) throw errorWithResponse(new ZanoWalletRpcWrongPaymentIdError(message), response);
  if (code === WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT) throw errorWithResponse(new ZanoWalletRpcWrongArgumentError(message), response);
  if (code === WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY) throw errorWithResponse(new ZanoWalletRpcNotEnoughMoneyError(message), response);
  if (code === WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET) {
    throw errorWithResponse(new ZanoWalletRpcWrongMixinsForAuditableWalletError(message), response);
  }
}

export type StatusFieldErrors = { [S in Exclude<API_RETURN_CODE, API_RETURN_CODE.OK>]: { status: S } }[Exclude<API_RETURN_CODE, API_RETURN_CODE.OK>];
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
  if (error_code === API_RETURN_CODE.BAD_ARG_INVALID_JSON) throw errorWithResponse(new ZanoCoreBadArgumentError(), response);
  if (error_code === API_RETURN_CODE.FAIL) throw errorWithResponse(new ZanoFailedError(), response);
}
