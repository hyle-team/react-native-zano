import { API_RETURN_CODE, JSON_RPC_ERROR_CODE, WALLET_RPC_ERROR_CODE } from './entities';

export function createErrorClass(name: string, defaultMessage?: string) {
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
/* prettier-ignore */ export class ZanoApiFailError extends createApiWalletError(API_RETURN_CODE.FAIL, 'ZanoApiFailError') {}
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
/* prettier-ignore */ export class ZanoApiBadArgUnknownDecimalPointError extends createApiWalletError(API_RETURN_CODE.BAD_ARG_UNKNOWN_DECIMAL_POINT, 'ZanoApiBadArgUnknownDecimalPointError') {}
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
/* prettier-ignore */ export class ZanoApiArgOutOfLimitsError extends createApiWalletError(API_RETURN_CODE.ARG_OUT_OF_LIMITS, 'ZanoApiArgOutOfLimitsError') {}
/* prettier-ignore */ export class ZanoApiTxHasTooManyOutputsError extends createApiWalletError(API_RETURN_CODE.TX_HAS_TOO_MANY_OUTPUTS, 'ZanoApiTxHasTooManyOutputsError') {}
export const ZanoApiReturnCodeErrors = {
  [API_RETURN_CODE.FAIL]: ZanoApiFailError,
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
  [API_RETURN_CODE.BAD_ARG_UNKNOWN_DECIMAL_POINT]: ZanoApiBadArgUnknownDecimalPointError,
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
  [API_RETURN_CODE.ARG_OUT_OF_LIMITS]: ZanoApiArgOutOfLimitsError,
  [API_RETURN_CODE.TX_HAS_TOO_MANY_OUTPUTS]: ZanoApiTxHasTooManyOutputsError,
};

export abstract class ZanoJsonRpcError extends createErrorClass('ZanoJsonRpcError') {
  abstract readonly code: JSON_RPC_ERROR_CODE;
}
function createZanoJsonError(code: JSON_RPC_ERROR_CODE, name: string, defaultMessage?: string) {
  interface SpecificError {
    code: JSON_RPC_ERROR_CODE;
  }
  class SpecificError extends ZanoJsonRpcError {
    constructor(message?: string) {
      super(message ?? defaultMessage);
    }
  }
  Object.defineProperty(SpecificError.prototype, Symbol.toStringTag, { value: name, configurable: true });
  Object.defineProperty(SpecificError.prototype, 'name', { value: name, writable: true, configurable: true, enumerable: true });
  Object.defineProperty(SpecificError.prototype, 'code', { value: code, writable: true, configurable: true, enumerable: true });
  return SpecificError;
}
/* prettier-ignore */ export class ZanoJsonRpcDefaultError extends createZanoJsonError(JSON_RPC_ERROR_CODE.DEFAULT, 'ZanoJsonRpcDefaultError') {}
/* prettier-ignore */ export class ZanoJsonRpcInvalidRequestError extends createZanoJsonError(JSON_RPC_ERROR_CODE.INVALID_REQUEST, 'ZanoJsonRpcInvalidRequestError') {}
/* prettier-ignore */ export class ZanoJsonRpcMethodNotFoundError extends createZanoJsonError(JSON_RPC_ERROR_CODE.METHOD_NOT_FOUND, 'ZanoJsonRpcMethodNotFoundError') {}
/* prettier-ignore */ export class ZanoJsonRpcInvalidParamsError extends createZanoJsonError(JSON_RPC_ERROR_CODE.INVALID_PARAMS, 'ZanoJsonRpcInvalidParamsError') {}
/* prettier-ignore */ export class ZanoJsonRpcInternalError extends createZanoJsonError(JSON_RPC_ERROR_CODE.INTERNAL_ERROR, 'ZanoJsonRpcInternalError') {}
/* prettier-ignore */ export class ZanoJsonRpcParseError extends createZanoJsonError(JSON_RPC_ERROR_CODE.PARSE_ERROR, 'ZanoJsonRpcParseError') {}
export const ZanoJsonRpcCodeErrors = {
  [JSON_RPC_ERROR_CODE.DEFAULT]: ZanoJsonRpcDefaultError,
  [JSON_RPC_ERROR_CODE.INVALID_REQUEST]: ZanoJsonRpcInvalidRequestError,
  [JSON_RPC_ERROR_CODE.METHOD_NOT_FOUND]: ZanoJsonRpcMethodNotFoundError,
  [JSON_RPC_ERROR_CODE.INVALID_PARAMS]: ZanoJsonRpcInvalidParamsError,
  [JSON_RPC_ERROR_CODE.INTERNAL_ERROR]: ZanoJsonRpcInternalError,
  [JSON_RPC_ERROR_CODE.PARSE_ERROR]: ZanoJsonRpcParseError,
};

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
/* prettier-ignore */ export class ZanoWalletRpcWrongAddressError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'ZanoWalletRpcWrongAddressError') {}
/* prettier-ignore */ export class ZanoWalletRpcDaemonIsBusyError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY, 'ZanoWalletRpcDaemonIsBusyError') {}
/* prettier-ignore */ export class ZanoWalletRpcGenericTransferError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR, 'ZanoWalletRpcGenericTransferError') {}
/* prettier-ignore */ export class ZanoWalletRpcWrongPaymentIdError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID, 'ZanoWalletRpcWrongPaymentIdError') {}
/* prettier-ignore */ export class ZanoWalletRpcWrongArgumentError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, 'ZanoWalletRpcWrongArgumentError') {}
/* prettier-ignore */ export class ZanoWalletRpcNotEnoughMoneyError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY, 'ZanoWalletRpcNotEnoughMoneyError') {}
/* prettier-ignore */ export class ZanoWalletRpcWrongMixinsForAuditableWalletError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET, 'ZanoWalletRpcWrongMixinsForAuditableWalletError') {}
/* prettier-ignore */ export class ZanoWalletRpcGenericError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.GENERIC_ERROR, 'ZanoWalletRpcGenericError') {}
/* prettier-ignore */ export class ZanoWalletRpcKeyImageAlreadySpentError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.KEY_IMAGE_ALREADY_SPENT, 'ZanoWalletRpcKeyImageAlreadySpentError') {}
export const ZanoWalletRpcCodeErrors = {
  [WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR]: ZanoWalletRpcUnknownError,
  [WALLET_RPC_ERROR_CODE.WRONG_ADDRESS]: ZanoWalletRpcWrongAddressError,
  [WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY]: ZanoWalletRpcDaemonIsBusyError,
  [WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR]: ZanoWalletRpcGenericTransferError,
  [WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID]: ZanoWalletRpcWrongPaymentIdError,
  [WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT]: ZanoWalletRpcWrongArgumentError,
  [WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY]: ZanoWalletRpcNotEnoughMoneyError,
  [WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET]: ZanoWalletRpcWrongMixinsForAuditableWalletError,
  [WALLET_RPC_ERROR_CODE.GENERIC_ERROR]: ZanoWalletRpcGenericError,
  [WALLET_RPC_ERROR_CODE.KEY_IMAGE_ALREADY_SPENT]: ZanoWalletRpcKeyImageAlreadySpentError,
};

/* prettier-ignore */ /** @deprecated use {@link ZanoApiInternalError} */ export const ZanoInternalError = ZanoApiInternalError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiUninitializedError} */ export const ZanoUninitializedError = ZanoApiUninitializedError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiNotFoundError} */ export const ZanoNotFoundError = ZanoApiNotFoundError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWrongPasswordError} */ export const ZanoWrongPasswordError = ZanoApiWrongPasswordError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiInvalidFileError} */ export const ZanoInvalidFileError = ZanoApiInvalidFileError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiFailError} */ export const ZanoFailedError = ZanoApiFailError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiFailError} */ export const ZanoApiFailedError = ZanoApiFailError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiAlreadyExistsError} */ export const ZanoAlreadyExistsError = ZanoApiAlreadyExistsError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWalletWatchOnlyNotSupportedError} */ export const ZanoWatchOnlyWalletNotSupported = ZanoApiWalletWatchOnlyNotSupportedError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWrongSeedError} */ export const ZanoWrongSeedError = ZanoApiWrongSeedError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWalletWrongIdError} */ export const ZanoWrongWalletIdError = ZanoApiWalletWrongIdError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongAddressError} */ export const ZanoWalletRpcWrongAddress = ZanoWalletRpcWrongAddressError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcDaemonIsBusyError} */ export const ZanoWalletRpcDaemonIsBusy = ZanoWalletRpcDaemonIsBusyError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongPaymentIdError} */ export const ZanoWalletRpcWrongPaymentId = ZanoWalletRpcWrongPaymentIdError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongArgumentError} */ export const ZanoWalletRpcWrongArgument = ZanoWalletRpcWrongArgumentError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcNotEnoughMoneyError} */ export const ZanoWalletRpcNotEnoughMoney = ZanoWalletRpcNotEnoughMoneyError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongMixinsForAuditableWalletError} */ export const ZanoWalletRpcWrongMixinsForAuditableWallet = ZanoWalletRpcWrongMixinsForAuditableWalletError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiBadArgError} */ export const ZanoCoreBadArgumentError = ZanoApiBadArgError;
/* prettier-ignore */ /** @deprecated use {@link ZanoJsonRpcInvalidRequestError} */ export const ZanoWalletRpcInvalidRequest = ZanoJsonRpcInvalidRequestError;
/* prettier-ignore */ /** @deprecated use {@link ZanoJsonRpcMethodNotFoundError} */ export const ZanoWalletRpcMethodNotFound = ZanoJsonRpcMethodNotFoundError;
/* prettier-ignore */ /** @deprecated use {@link ZanoJsonRpcInvalidParamsError} */ export const ZanoWalletRpcInvalidParams = ZanoJsonRpcInvalidParamsError;
/* prettier-ignore */ /** @deprecated use {@link ZanoJsonRpcParseError} */ export const ZanoWalletRpcParseError = ZanoJsonRpcParseError;
