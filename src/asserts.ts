import { API_RETURN_CODE, WALLET_RPC_ERROR_CODE, type ErrorCode, type ReturnCode } from './entities';
import {
  ZanoAlreadyExistsError,
  ZanoCoreBadArgumentError,
  ZanoFailedError,
  ZanoInternalError,
  ZanoInvalidFileError,
  ZanoNotFoundError,
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
  if (return_code === API_RETURN_CODE.UNINITIALIZED) throw new ZanoUninitializedError();
  if (return_code === API_RETURN_CODE.INTERNAL_ERROR) throw new ZanoInternalError();
  if (return_code.startsWith(API_RETURN_CODE.INTERNAL_ERROR)) {
    const message = return_code.substring(`${API_RETURN_CODE.INTERNAL_ERROR} `.length);
    throw new ZanoInternalError(message);
  }
  if (return_code === API_RETURN_CODE.FAIL) throw new ZanoFailedError();
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
  if (code === API_RETURN_CODE.NOT_FOUND) throw new ZanoNotFoundError(message);
  if (code === API_RETURN_CODE.WRONG_PASSWORD) throw new ZanoWrongPasswordError(message);
  if (code === API_RETURN_CODE.INVALID_FILE) throw new ZanoInvalidFileError(message);
  if (code === API_RETURN_CODE.ALREADY_EXISTS) throw new ZanoAlreadyExistsError(message);
  if (code === API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED) throw new ZanoWatchOnlyWalletNotSupported(message);
  if (code === API_RETURN_CODE.FILE_NOT_FOUND) throw new ZanoNotFoundError(message);
  if (code === API_RETURN_CODE.WRONG_SEED) throw new ZanoWrongSeedError(message);
  if (code === API_RETURN_CODE.UNINITIALIZED) throw new ZanoUninitializedError(message);
  if (code.startsWith(API_RETURN_CODE.INTERNAL_ERROR)) {
    let description;
    if (message) {
      description = message;
    } else if (code.startsWith(`${API_RETURN_CODE.INTERNAL_ERROR}, DESCRIPTION: `)) {
      description = code.substring(`${API_RETURN_CODE.INTERNAL_ERROR}, DESCRIPTION: `.length);
    }
    throw new ZanoInternalError(description);
  }
  if (code.startsWith(API_RETURN_CODE.FAIL)) {
    let description;
    if (message) {
      description = message;
    } else if (code.startsWith(`${API_RETURN_CODE.FAIL}:`)) {
      description = code.substring(`${API_RETURN_CODE.FAIL}:`.length);
    }
    throw new ZanoInternalError(description);
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
    if (message === API_RETURN_CODE.BUSY) throw new ZanoWalletBusyError();
    throw new ZanoWalletRpcUnknownError(message);
  }
  if (code === WALLET_RPC_ERROR_CODE.WRONG_ADDRESS) throw new ZanoWalletRpcWrongAddressError(message);
  if (code === WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY) throw new ZanoWalletRpcDaemonIsBusyError(message);
  if (code === WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR) throw new ZanoWalletRpcGenericTransferError(message);
  if (code === WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID) throw new ZanoWalletRpcWrongPaymentIdError(message);
  if (code === WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT) throw new ZanoWalletRpcWrongArgumentError(message);
  if (code === WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY) throw new ZanoWalletRpcNotEnoughMoneyError(message);
  if (code === WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET) throw new ZanoWalletRpcWrongMixinsForAuditableWalletError(message);
}

export type CoreCodeErrors = { error_code: API_RETURN_CODE.BAD_ARG_INVALID_JSON } | { error_code: API_RETURN_CODE.FAIL };
export function assertCoreRpcError<R extends object>(response: R): asserts response is Exclude<R, CoreCodeErrors> {
  if (!('error_code' in response)) return;
  const { error_code } = response;
  if (typeof error_code !== 'string') return;
  if (error_code === API_RETURN_CODE.BAD_ARG_INVALID_JSON) throw new ZanoCoreBadArgumentError();
  if (error_code === API_RETURN_CODE.FAIL) throw new ZanoFailedError();
}
