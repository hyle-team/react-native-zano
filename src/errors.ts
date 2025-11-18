import { API_RETURN_CODE, WALLET_RPC_ERROR_CODE } from './entities';
import { GENERAL_INTERNAL_ERROR } from './plain-wallet/enums';

function createErrorClass(name: string, defaultMessage?: string) {
  class SpecificError extends Error {
    constructor(message?: string) {
      super(message ?? defaultMessage);
    }
  }
  Object.defineProperty(SpecificError.prototype, Symbol.toStringTag, { value: name, configurable: true });
  Object.defineProperty(SpecificError.prototype, 'name', { value: name, writable: true, configurable: true, enumerable: true });
  return SpecificError;
}

export class ZanoBindingError extends createErrorClass('ZanoBindingError') {}

export class ZanoStatusError extends createErrorClass('ZanoStatusError') {
  constructor(
    readonly status: API_RETURN_CODE,
    message?: string
  ) {
    super(message);
  }
}

export class ZanoGeneralError extends createErrorClass('ZanoGeneralError') {}
export class ZanoInitializeError extends createErrorClass('ZanoInitializeError', GENERAL_INTERNAL_ERROR.INIT) {}

export abstract class ZanoApiRpcError extends createErrorClass('ZanoApiRpcError') {
  abstract readonly code: API_RETURN_CODE;
}
function createApiWalletError(code: API_RETURN_CODE, name: string, defaultMessage: string = code) {
  interface SpecificError {
    code: API_RETURN_CODE;
  }
  class SpecificError extends ZanoApiRpcError {
    constructor(message?: string) {
      super(message ?? defaultMessage);
    }
  }
  Object.defineProperty(SpecificError.prototype, Symbol.toStringTag, { value: name, configurable: true });
  Object.defineProperty(SpecificError.prototype, 'name', { value: name, writable: true, configurable: true, enumerable: true });
  Object.defineProperty(SpecificError.prototype, 'code', { value: code, writable: true, configurable: true, enumerable: true });
  return SpecificError;
}
/* prettier-ignore */ export class ZanoApiFailedError extends createApiWalletError(API_RETURN_CODE.FAIL, 'ZanoApiFailedError') {}
/* prettier-ignore */ export class ZanoApiNotFoundError extends createApiWalletError(API_RETURN_CODE.NOT_FOUND, 'ZanoApiNotFoundError') {}
/* prettier-ignore */ export class ZanoApiAccessDeniedError extends createApiWalletError(API_RETURN_CODE.ACCESS_DENIED, 'ZanoApiAccessDeniedError') {}
/* prettier-ignore */ export class ZanoApiInternalError extends createApiWalletError(API_RETURN_CODE.INTERNAL_ERROR, 'ZanoApiInternalError') {}
/* prettier-ignore */ export class ZanoApiNotEnoughMoneyError extends createApiWalletError(API_RETURN_CODE.NOT_ENOUGH_MONEY, 'ZanoApiNotEnoughMoneyError') {}
/* prettier-ignore */ export class ZanoApiNotEnoughOutputsForMixingError extends createApiWalletError(API_RETURN_CODE.NOT_ENOUGH_OUTPUTS_FOR_MIXING, 'ZanoApiNotEnoughOutputsForMixingError') {}
/* prettier-ignore */ export class ZanoApiInternalErrorQueFullError extends createApiWalletError(API_RETURN_CODE.INTERNAL_ERROR_QUE_FULL, 'ZanoApiInternalErrorQueFullError') {}
/* prettier-ignore */ export class ZanoApiBadArgError extends createApiWalletError(API_RETURN_CODE.BAD_ARG, 'ZanoApiBadArgError') {}
/* prettier-ignore */ export class ZanoApiBadArgEmptyDestinationsError extends createApiWalletError(API_RETURN_CODE.BAD_ARG_EMPTY_DESTINATIONS, 'ZanoApiBadArgEmptyDestinationsError') {}
/* prettier-ignore */ export class ZanoApiBadArgWrongFeeError extends createApiWalletError(API_RETURN_CODE.BAD_ARG_WRONG_FEE, 'ZanoApiBadArgWrongFeeError') {}
/* prettier-ignore */ export class ZanoApiBadArgInvalidAddressError extends createApiWalletError(API_RETURN_CODE.BAD_ARG_INVALID_ADDRESS, 'ZanoApiBadArgInvalidAddressError') {}
/* prettier-ignore */ export class ZanoApiBadArgWrongAmountError extends createApiWalletError(API_RETURN_CODE.BAD_ARG_WRONG_AMOUNT, 'ZanoApiBadArgWrongAmountError') {}
/* prettier-ignore */ export class ZanoApiBadArgWrongPaymentIdError extends createApiWalletError(API_RETURN_CODE.BAD_ARG_WRONG_PAYMENT_ID, 'ZanoApiBadArgWrongPaymentIdError') {}
/* prettier-ignore */ export class ZanoApiBadArgInvalidJsonError extends createApiWalletError(API_RETURN_CODE.BAD_ARG_INVALID_JSON, 'ZanoApiBadArgInvalidJsonError') {}
/* prettier-ignore */ export class ZanoApiWrongPasswordError extends createApiWalletError(API_RETURN_CODE.WRONG_PASSWORD, 'ZanoApiWrongPasswordError') {}
/* prettier-ignore */ export class ZanoApiWalletWrongIdError extends createApiWalletError(API_RETURN_CODE.WALLET_WRONG_ID, 'ZanoApiWalletWrongIdError') {}
/* prettier-ignore */ export class ZanoApiWalletWatchOnlyNotSupportedError extends createApiWalletError(API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED, 'ZanoApiWalletWatchOnlyNotSupportedError') {}
/* prettier-ignore */ export class ZanoApiWalletAuditableNotSupportedError extends createApiWalletError(API_RETURN_CODE.WALLET_AUDITABLE_NOT_SUPPORTED, 'ZanoApiWalletAuditableNotSupportedError') {}
/* prettier-ignore */ export class ZanoApiWalletFeeTooLowError extends createApiWalletError(API_RETURN_CODE.WALLET_FEE_TOO_LOW, 'ZanoApiWalletFeeTooLowError') {}
/* prettier-ignore */ export class ZanoApiFileNotFoundError extends createApiWalletError(API_RETURN_CODE.FILE_NOT_FOUND, 'ZanoApiFileNotFoundError') {}
/* prettier-ignore */ export class ZanoApiAlreadyExistsError extends createApiWalletError(API_RETURN_CODE.ALREADY_EXISTS, 'ZanoApiAlreadyExistsError') {}
/* prettier-ignore */ export class ZanoApiCanceledError extends createApiWalletError(API_RETURN_CODE.CANCELED, 'ZanoApiCanceledError') {}
/* prettier-ignore */ export class ZanoApiFileRestoredError extends createApiWalletError(API_RETURN_CODE.FILE_RESTORED, 'ZanoApiFileRestoredError') {}
/* prettier-ignore */ export class ZanoApiTrueError extends createApiWalletError(API_RETURN_CODE.TRUE, 'ZanoApiTrueError') {}
/* prettier-ignore */ export class ZanoApiFalseError extends createApiWalletError(API_RETURN_CODE.FALSE, 'ZanoApiFalseError') {}
/* prettier-ignore */ export class ZanoApiCoreBusyError extends createApiWalletError(API_RETURN_CODE.CORE_BUSY, 'ZanoApiCoreBusyError') {}
/* prettier-ignore */ export class ZanoApiOverflowError extends createApiWalletError(API_RETURN_CODE.OVERFLOW, 'ZanoApiOverflowError') {}
/* prettier-ignore */ export class ZanoApiBusyError extends createApiWalletError(API_RETURN_CODE.BUSY, 'ZanoApiBusyError') {}
/* prettier-ignore */ export class ZanoApiInvalidFileError extends createApiWalletError(API_RETURN_CODE.INVALID_FILE, 'ZanoApiInvalidFileError') {}
/* prettier-ignore */ export class ZanoApiWrongSeedError extends createApiWalletError(API_RETURN_CODE.WRONG_SEED, 'ZanoApiWrongSeedError') {}
/* prettier-ignore */ export class ZanoApiGenesisMismatchError extends createApiWalletError(API_RETURN_CODE.GENESIS_MISMATCH, 'ZanoApiGenesisMismatchError') {}
/* prettier-ignore */ export class ZanoApiDisconnectedError extends createApiWalletError(API_RETURN_CODE.DISCONNECTED, 'ZanoApiDisconnectedError') {}
/* prettier-ignore */ export class ZanoApiUninitializedError extends createApiWalletError(API_RETURN_CODE.UNINITIALIZED, 'ZanoApiUninitializedError') {}
/* prettier-ignore */ export class ZanoApiTxIsTooBigError extends createApiWalletError(API_RETURN_CODE.TX_IS_TOO_BIG, 'ZanoApiTxIsTooBigError') {}
/* prettier-ignore */ export class ZanoApiTxRejectedError extends createApiWalletError(API_RETURN_CODE.TX_REJECTED, 'ZanoApiTxRejectedError') {}
/* prettier-ignore */ export class ZanoApiHtlcOriginHashMissmatchedError extends createApiWalletError(API_RETURN_CODE.HTLC_ORIGIN_HASH_MISSMATCHED, 'ZanoApiHtlcOriginHashMissmatchedError') {}
/* prettier-ignore */ export class ZanoApiWrapError extends createApiWalletError(API_RETURN_CODE.WRAP, 'ZanoApiWrapError') {}
/* prettier-ignore */ export class ZanoApiMissingZcInputsError extends createApiWalletError(API_RETURN_CODE.MISSING_ZC_INPUTS, 'ZanoApiMissingZcInputsError') {}
export const ZanoApiReturnCodeErrors = {
  [API_RETURN_CODE.FAIL]: ZanoApiFailedError,
  [API_RETURN_CODE.NOT_FOUND]: ZanoApiNotFoundError,
  [API_RETURN_CODE.ACCESS_DENIED]: ZanoApiAccessDeniedError,
  [API_RETURN_CODE.INTERNAL_ERROR]: ZanoApiInternalError,
  [API_RETURN_CODE.NOT_ENOUGH_MONEY]: ZanoApiNotEnoughMoneyError,
  [API_RETURN_CODE.NOT_ENOUGH_OUTPUTS_FOR_MIXING]: ZanoApiNotEnoughOutputsForMixingError,
  [API_RETURN_CODE.INTERNAL_ERROR_QUE_FULL]: ZanoApiInternalErrorQueFullError,
  [API_RETURN_CODE.BAD_ARG]: ZanoApiBadArgError,
  [API_RETURN_CODE.BAD_ARG_EMPTY_DESTINATIONS]: ZanoApiBadArgEmptyDestinationsError,
  [API_RETURN_CODE.BAD_ARG_WRONG_FEE]: ZanoApiBadArgWrongFeeError,
  [API_RETURN_CODE.BAD_ARG_INVALID_ADDRESS]: ZanoApiBadArgInvalidAddressError,
  [API_RETURN_CODE.BAD_ARG_WRONG_AMOUNT]: ZanoApiBadArgWrongAmountError,
  [API_RETURN_CODE.BAD_ARG_WRONG_PAYMENT_ID]: ZanoApiBadArgWrongPaymentIdError,
  [API_RETURN_CODE.BAD_ARG_INVALID_JSON]: ZanoApiBadArgInvalidJsonError,
  [API_RETURN_CODE.WRONG_PASSWORD]: ZanoApiWrongPasswordError,
  [API_RETURN_CODE.WALLET_WRONG_ID]: ZanoApiWalletWrongIdError,
  [API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED]: ZanoApiWalletWatchOnlyNotSupportedError,
  [API_RETURN_CODE.WALLET_AUDITABLE_NOT_SUPPORTED]: ZanoApiWalletAuditableNotSupportedError,
  [API_RETURN_CODE.WALLET_FEE_TOO_LOW]: ZanoApiWalletFeeTooLowError,
  [API_RETURN_CODE.FILE_NOT_FOUND]: ZanoApiFileNotFoundError,
  [API_RETURN_CODE.ALREADY_EXISTS]: ZanoApiAlreadyExistsError,
  [API_RETURN_CODE.CANCELED]: ZanoApiCanceledError,
  [API_RETURN_CODE.FILE_RESTORED]: ZanoApiFileRestoredError,
  [API_RETURN_CODE.TRUE]: ZanoApiTrueError,
  [API_RETURN_CODE.FALSE]: ZanoApiFalseError,
  [API_RETURN_CODE.CORE_BUSY]: ZanoApiCoreBusyError,
  [API_RETURN_CODE.OVERFLOW]: ZanoApiOverflowError,
  [API_RETURN_CODE.BUSY]: ZanoApiBusyError,
  [API_RETURN_CODE.INVALID_FILE]: ZanoApiInvalidFileError,
  [API_RETURN_CODE.WRONG_SEED]: ZanoApiWrongSeedError,
  [API_RETURN_CODE.GENESIS_MISMATCH]: ZanoApiGenesisMismatchError,
  [API_RETURN_CODE.DISCONNECTED]: ZanoApiDisconnectedError,
  [API_RETURN_CODE.UNINITIALIZED]: ZanoApiUninitializedError,
  [API_RETURN_CODE.TX_IS_TOO_BIG]: ZanoApiTxIsTooBigError,
  [API_RETURN_CODE.TX_REJECTED]: ZanoApiTxRejectedError,
  [API_RETURN_CODE.HTLC_ORIGIN_HASH_MISSMATCHED]: ZanoApiHtlcOriginHashMissmatchedError,
  [API_RETURN_CODE.WRAP]: ZanoApiWrapError,
  [API_RETURN_CODE.MISSING_ZC_INPUTS]: ZanoApiMissingZcInputsError,
};

export class ZanoWalletBusyError extends createErrorClass('ZanoWalletBusyError') {}

export abstract class ZanoWalletRpcError extends createErrorClass('ZanoWalletRpcUnknownError') {
  abstract readonly code: WALLET_RPC_ERROR_CODE;
}
function createZanoWalletError(code: WALLET_RPC_ERROR_CODE, name: string, defaultMessage?: string) {
  interface SpecificError {
    code: WALLET_RPC_ERROR_CODE;
  }
  class SpecificError extends ZanoWalletRpcError {
    constructor(message?: string) {
      super(message ?? defaultMessage);
    }
  }
  Object.defineProperty(SpecificError.prototype, Symbol.toStringTag, { value: name, configurable: true });
  Object.defineProperty(SpecificError.prototype, 'name', { value: name, writable: true, configurable: true, enumerable: true });
  Object.defineProperty(SpecificError.prototype, 'code', { value: code, writable: true, configurable: true, enumerable: true });
  return SpecificError;
}
/* prettier-ignore */ export class ZanoWalletRpcUnknownError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR, 'ZanoWalletRpcUnknownError') {}
/* prettier-ignore */ export class ZanoWalletRpcWrongAddress extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'ZanoWalletRpcWrongAddress') {}
/* prettier-ignore */ export class ZanoWalletRpcDaemonIsBusy extends createZanoWalletError(WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY, 'ZanoWalletRpcDaemonIsBusy') {}
/* prettier-ignore */ export class ZanoWalletRpcGenericTransferError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR, 'ZanoWalletRpcGenericTransferError') {}
/* prettier-ignore */ export class ZanoWalletRpcWrongPaymentId extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID, 'ZanoWalletRpcWrongPaymentId') {}
/* prettier-ignore */ export class ZanoWalletRpcWrongArgument extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, 'ZanoWalletRpcWrongArgument') {}
/* prettier-ignore */ export class ZanoWalletRpcNotEnoughMoney extends createZanoWalletError(WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY, 'ZanoWalletRpcNotEnoughMoney') {}
/* prettier-ignore */ export class ZanoWalletRpcWrongMixinsForAuditableWallet extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET, 'ZanoWalletRpcWrongMixinsForAuditableWallet') {}
/* prettier-ignore */ export class ZanoWalletRpcInvalidRequest extends createZanoWalletError(WALLET_RPC_ERROR_CODE.INVALID_REQUEST, 'ZanoWalletRpcInvalidRequest') {}
/* prettier-ignore */ export class ZanoWalletRpcInvalidParams extends createZanoWalletError(WALLET_RPC_ERROR_CODE.INVALID_PARAMS, 'ZanoWalletRpcInvalidParams') {}
/* prettier-ignore */ export class ZanoWalletRpcParseError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.PARSE_ERROR, 'ZanoWalletRpcParseError') {}
export const ZanoWalletRpcCodeErrors = {
  [WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR]: ZanoWalletRpcUnknownError,
  [WALLET_RPC_ERROR_CODE.WRONG_ADDRESS]: ZanoWalletRpcWrongAddress,
  [WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY]: ZanoWalletRpcDaemonIsBusy,
  [WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR]: ZanoWalletRpcGenericTransferError,
  [WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID]: ZanoWalletRpcWrongPaymentId,
  [WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT]: ZanoWalletRpcWrongArgument,
  [WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY]: ZanoWalletRpcNotEnoughMoney,
  [WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET]: ZanoWalletRpcWrongMixinsForAuditableWallet,
  [WALLET_RPC_ERROR_CODE.INVALID_REQUEST]: ZanoWalletRpcInvalidRequest,
  [WALLET_RPC_ERROR_CODE.INVALID_PARAMS]: ZanoWalletRpcInvalidParams,
  [WALLET_RPC_ERROR_CODE.PARSE_ERROR]: ZanoWalletRpcParseError,
};

/* prettier-ignore */ /** @deprecated use {@link ZanoApiInternalError} */ export const ZanoInternalError = ZanoApiInternalError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiUninitializedError} */ export const ZanoUninitializedError = ZanoApiUninitializedError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiNotFoundError} */ export const ZanoNotFoundError = ZanoApiNotFoundError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWrongPasswordError} */ export const ZanoWrongPasswordError = ZanoApiWrongPasswordError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiInvalidFileError} */ export const ZanoInvalidFileError = ZanoApiInvalidFileError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiFailedError} */ export const ZanoFailedError = ZanoApiFailedError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiAlreadyExistsError} */ export const ZanoAlreadyExistsError = ZanoApiAlreadyExistsError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWalletWatchOnlyNotSupportedError} */ export const ZanoWatchOnlyWalletNotSupported = ZanoApiWalletWatchOnlyNotSupportedError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWrongSeedError} */ export const ZanoWrongSeedError = ZanoApiWrongSeedError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWalletWrongIdError} */ export const ZanoWrongWalletIdError = ZanoApiWalletWrongIdError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongAddress} */ export const ZanoWalletRpcWrongAddressError = ZanoWalletRpcWrongAddress;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcDaemonIsBusy} */ export const ZanoWalletRpcDaemonIsBusyError = ZanoWalletRpcDaemonIsBusy;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongPaymentId} */ export const ZanoWalletRpcWrongPaymentIdError = ZanoWalletRpcWrongPaymentId;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongArgument} */ export const ZanoWalletRpcWrongArgumentError = ZanoWalletRpcWrongArgument;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcNotEnoughMoney} */ export const ZanoWalletRpcNotEnoughMoneyError = ZanoWalletRpcNotEnoughMoney;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongMixinsForAuditableWallet} */ export const ZanoWalletRpcWrongMixinsForAuditableWalletError = ZanoWalletRpcWrongMixinsForAuditableWallet;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiBadArgError} */ export const ZanoCoreBadArgumentError = ZanoApiBadArgError;
