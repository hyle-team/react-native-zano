import { API_RETURN_CODE } from './entities';
import { GENERAL_INTERNAL_ERROR } from './plain-wallet/enums';
import { createErrorClass } from './utils/errors';

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
