import { API_RETURN_CODE, WALLET_RPC_ERROR_CODE, type ErrorCode, type ReturnCode } from './entities';
import { GENERAL_INTERNAL_ERROR } from './plain-wallet/enums';
import { createErrorClass } from './utils/errors';
import type { JSONRpcFailedResponse, JSONRpcSuccessfulResponse } from './utils/json-rpc';

export class ZanoGeneralError extends createErrorClass('ZanoGeneralError') {}
export class ZanoInitializeError extends createErrorClass('ZanoInitializeError', GENERAL_INTERNAL_ERROR.INIT) {}
export class ZanoInternalError extends createErrorClass('ZanoInternalError', API_RETURN_CODE.INTERNAL_ERROR) {}
export class ZanoUninitializedError extends createErrorClass('ZanoUninitializedError', API_RETURN_CODE.UNINITIALIZED) {}
export class ZanoNotFoundError extends createErrorClass('ZanoNotFoundError', API_RETURN_CODE.NOT_FOUND) {}
export class ZanoWrongPasswordError extends createErrorClass('ZanoWrongPasswordError', API_RETURN_CODE.WRONG_PASSWORD) {}
export class ZanoInvalidFileError extends createErrorClass('ZanoInvalidFileError', API_RETURN_CODE.INVALID_FILE) {}
export class ZanoFailedError extends createErrorClass('ZanoFailedError', API_RETURN_CODE.FAIL) {}
export class ZanoAlreadyExistsError extends createErrorClass('ZanoAlreadyExistsError', API_RETURN_CODE.ALREADY_EXISTS) {}
export class ZanoWatchOnlyWalletNotSupported extends createErrorClass(
  'ZanoWatchOnlyWalletNotSupported',
  API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED
) {}
export class ZanoWrongSeedError extends createErrorClass('ZanoWrongSeedError', API_RETURN_CODE.WRONG_SEED) {}
export class ZanoWrongWalletIdError extends createErrorClass('ZanoWrongWalletIdError', API_RETURN_CODE.WALLET_WRONG_ID) {}
export class ZanoWalletRpcUnknownError extends createErrorClass('ZanoWalletRpcUnknownError') {}
export class ZanoWalletRpcWrongAddressError extends createErrorClass('ZanoWalletRpcWrongAddressError') {}
export class ZanoWalletRpcDaemonIsBusyError extends createErrorClass('ZanoWalletRpcDaemonIsBusyError') {}
export class ZanoWalletRpcGenericTransferError extends createErrorClass('ZanoWalletRpcGenericTransferError') {}
export class ZanoWalletRpcWrongPaymentIdError extends createErrorClass('ZanoWalletRpcWrongPaymentIdError') {}
export class ZanoWalletRpcWrongArgumentError extends createErrorClass('ZanoWalletRpcWrongArgumentError') {}
export class ZanoWalletRpcNotEnoughMoneyError extends createErrorClass('ZanoWalletRpcNotEnoughMoneyError') {}
export class ZanoWalletRpcWrongMixinsForAuditableWalletError extends createErrorClass('ZanoWalletRpcWrongMixinsForAuditableWalletError') {}

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
  if (code === WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR) throw new ZanoWalletRpcUnknownError(message);
  if (code === WALLET_RPC_ERROR_CODE.WRONG_ADDRESS) throw new ZanoWalletRpcWrongAddressError(message);
  if (code === WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY) throw new ZanoWalletRpcDaemonIsBusyError(message);
  if (code === WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR) throw new ZanoWalletRpcGenericTransferError(message);
  if (code === WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID) throw new ZanoWalletRpcWrongPaymentIdError(message);
  if (code === WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT) throw new ZanoWalletRpcWrongArgumentError(message);
  if (code === WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY) throw new ZanoWalletRpcNotEnoughMoneyError(message);
  if (code === WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET) throw new ZanoWalletRpcWrongMixinsForAuditableWalletError(message);
}
