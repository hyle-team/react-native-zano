import { Linking } from 'react-native';
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
  openInBrowser() {
    if (this.code in API_RETURN_CODE) {
      Linking.openURL(`https://docs.zano.org/docs/use/handling-errors/API_RETURN_CODE_${this.code}`);
    }
  }
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
/* prettier-ignore */ export class ZanoApiFailError                        extends createApiWalletError(API_RETURN_CODE.FAIL,                            'ZanoApiFailError',                        'A general operation failure occurred.'                                                                  ) {}
/* prettier-ignore */ export class ZanoApiNotFoundError                    extends createApiWalletError(API_RETURN_CODE.NOT_FOUND,                       'ZanoApiNotFoundError',                    'The requested resource or item could not be found.'                                                     ) {}
/* prettier-ignore */ export class ZanoApiAccessDeniedError                extends createApiWalletError(API_RETURN_CODE.ACCESS_DENIED,                   'ZanoApiAccessDeniedError',                'You do not have permission to perform this action.'                                                     ) {}
/* prettier-ignore */ export class ZanoApiInternalError                    extends createApiWalletError(API_RETURN_CODE.INTERNAL_ERROR,                  'ZanoApiInternalError',                    'An unexpected internal error occurred within the wallet engine.'                                        ) {}
/* prettier-ignore */ export class ZanoApiNotEnoughMoneyError              extends createApiWalletError(API_RETURN_CODE.NOT_ENOUGH_MONEY,                'ZanoApiNotEnoughMoneyError',              'The account does not have sufficient funds to complete the transaction.'                                ) {}
/* prettier-ignore */ export class ZanoApiNotEnoughOutputsForMixingError   extends createApiWalletError(API_RETURN_CODE.NOT_ENOUGH_OUTPUTS_FOR_MIXING,   'ZanoApiNotEnoughOutputsForMixingError',   'Not enough unspent outputs are available to perform mixing for this transaction.'                       ) {}
/* prettier-ignore */ export class ZanoApiInternalErrorQueFullError        extends createApiWalletError(API_RETURN_CODE.INTERNAL_ERROR_QUE_FULL,         'ZanoApiInternalErrorQueFullError',        'The internal request queue is full; the system is currently overloaded.'                                ) {}
/* prettier-ignore */ export class ZanoApiBadArgError                      extends createApiWalletError(API_RETURN_CODE.BAD_ARG,                         'ZanoApiBadArgError',                      'One or more arguments provided to the API call are invalid.'                                            ) {}
/* prettier-ignore */ export class ZanoApiBadArgEmptyDestinationsError     extends createApiWalletError(API_RETURN_CODE.BAD_ARG_EMPTY_DESTINATIONS,      'ZanoApiBadArgEmptyDestinationsError',     'No destination addresses were provided for the transaction.'                                            ) {}
/* prettier-ignore */ export class ZanoApiBadArgWrongFeeError              extends createApiWalletError(API_RETURN_CODE.BAD_ARG_WRONG_FEE,               'ZanoApiBadArgWrongFeeError',              'The transaction fee specified is incorrect or unacceptable.'                                            ) {}
/* prettier-ignore */ export class ZanoApiBadArgInvalidAddressError        extends createApiWalletError(API_RETURN_CODE.BAD_ARG_INVALID_ADDRESS,         'ZanoApiBadArgInvalidAddressError',        'One or more of the provided addresses are invalid or malformed.'                                        ) {}
/* prettier-ignore */ export class ZanoApiBadArgWrongAmountError           extends createApiWalletError(API_RETURN_CODE.BAD_ARG_WRONG_AMOUNT,            'ZanoApiBadArgWrongAmountError',           'The specified amount is invalid or in an unacceptable format.'                                          ) {}
/* prettier-ignore */ export class ZanoApiBadArgUnknownDecimalPointError   extends createApiWalletError(API_RETURN_CODE.BAD_ARG_UNKNOWN_DECIMAL_POINT,   'ZanoApiBadArgUnknownDecimalPointError',   'The decimal point precision for this asset is unknown.'                                                 ) {}
/* prettier-ignore */ export class ZanoApiBadArgWrongPaymentIdError        extends createApiWalletError(API_RETURN_CODE.BAD_ARG_WRONG_PAYMENT_ID,        'ZanoApiBadArgWrongPaymentIdError',        'The payment ID provided is invalid or improperly formatted.'                                            ) {}
/* prettier-ignore */ export class ZanoApiBadArgInvalidJsonError           extends createApiWalletError(API_RETURN_CODE.BAD_ARG_INVALID_JSON,            'ZanoApiBadArgInvalidJsonError',           'The provided JSON data is malformed or cannot be parsed.'                                               ) {}
/* prettier-ignore */ export class ZanoApiWrongPasswordError               extends createApiWalletError(API_RETURN_CODE.WRONG_PASSWORD,                  'ZanoApiWrongPasswordError',               'The wallet password entered is incorrect.'                                                              ) {}
/* prettier-ignore */ export class ZanoApiWalletWrongIdError               extends createApiWalletError(API_RETURN_CODE.WALLET_WRONG_ID,                 'ZanoApiWalletWrongIdError',               'The specified wallet ID does not exist or is invalid.'                                                  ) {}
/* prettier-ignore */ export class ZanoApiWalletWatchOnlyNotSupportedError extends createApiWalletError(API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED, 'ZanoApiWalletWatchOnlyNotSupportedError', 'Watch-only wallets are not supported by this interface; use simplewallet instead.'                      ) {}
/* prettier-ignore */ export class ZanoApiWalletAuditableNotSupportedError extends createApiWalletError(API_RETURN_CODE.WALLET_AUDITABLE_NOT_SUPPORTED,  'ZanoApiWalletAuditableNotSupportedError', 'Auditable wallets are not supported in this context.'                                                   ) {}
/* prettier-ignore */ export class ZanoApiWalletFeeTooLowError             extends createApiWalletError(API_RETURN_CODE.WALLET_FEE_TOO_LOW,              'ZanoApiWalletFeeTooLowError',             'The transaction fee is below the minimum required threshold.'                                           ) {}
/* prettier-ignore */ export class ZanoApiFileNotFoundError                extends createApiWalletError(API_RETURN_CODE.FILE_NOT_FOUND,                  'ZanoApiFileNotFoundError',                'The specified wallet or key file could not be found on disk.'                                           ) {}
/* prettier-ignore */ export class ZanoApiAlreadyExistsError               extends createApiWalletError(API_RETURN_CODE.ALREADY_EXISTS,                  'ZanoApiAlreadyExistsError',               'A wallet or resource with this name or identifier already exists.'                                      ) {}
/* prettier-ignore */ export class ZanoApiCanceledError                    extends createApiWalletError(API_RETURN_CODE.CANCELED,                        'ZanoApiCanceledError',                    'The operation was canceled before completion.'                                                          ) {}
/* prettier-ignore */ export class ZanoApiFileRestoredError                extends createApiWalletError(API_RETURN_CODE.FILE_RESTORED,                   'ZanoApiFileRestoredError',                'The wallet file was corrupted but has been successfully restored from the blockchain.'                  ) {}
/* prettier-ignore */ export class ZanoApiTrueError                        extends createApiWalletError(API_RETURN_CODE.TRUE,                            'ZanoApiTrueError',                        'The operation returned a true result code treated as an error in this context.'                         ) {}
/* prettier-ignore */ export class ZanoApiFalseError                       extends createApiWalletError(API_RETURN_CODE.FALSE,                           'ZanoApiFalseError',                       'The operation returned a false result code treated as an error in this context.'                        ) {}
/* prettier-ignore */ export class ZanoApiCoreBusyError                    extends createApiWalletError(API_RETURN_CODE.CORE_BUSY,                       'ZanoApiCoreBusyError',                    'The core node is currently busy and cannot process the request.'                                        ) {}
/* prettier-ignore */ export class ZanoApiOverflowError                    extends createApiWalletError(API_RETURN_CODE.OVERFLOW,                        'ZanoApiOverflowError',                    'The number of registered aliases exceeds the maximum allowed limit and cannot be retrieved.'            ) {}
/* prettier-ignore */ export class ZanoApiBusyError                        extends createApiWalletError(API_RETURN_CODE.BUSY,                            'ZanoApiBusyError',                        'The service is temporarily busy; please try again shortly.'                                             ) {}
/* prettier-ignore */ export class ZanoApiInvalidFileError                 extends createApiWalletError(API_RETURN_CODE.INVALID_FILE,                    'ZanoApiInvalidFileError',                 'The wallet file is invalid or has an unrecognized format.'                                              ) {}
/* prettier-ignore */ export class ZanoApiWrongSeedError                   extends createApiWalletError(API_RETURN_CODE.WRONG_SEED,                      'ZanoApiWrongSeedError',                   'The seed phrase provided is incorrect or invalid.'                                                      ) {}
/* prettier-ignore */ export class ZanoApiGenesisMismatchError             extends createApiWalletError(API_RETURN_CODE.GENESIS_MISMATCH,                'ZanoApiGenesisMismatchError',             "The wallet's genesis block does not match the current network."                                         ) {}
/* prettier-ignore */ export class ZanoApiDisconnectedError                extends createApiWalletError(API_RETURN_CODE.DISCONNECTED,                    'ZanoApiDisconnectedError',                'The connection to the node has been lost or was never established.'                                     ) {}
/* prettier-ignore */ export class ZanoApiUninitializedError               extends createApiWalletError(API_RETURN_CODE.UNINITIALIZED,                   'ZanoApiUninitializedError',               'The wallet or service has not been initialized yet.'                                                    ) {}
/* prettier-ignore */ export class ZanoApiTxIsTooBigError                  extends createApiWalletError(API_RETURN_CODE.TX_IS_TOO_BIG,                   'ZanoApiTxIsTooBigError',                  'The transaction size exceeds the network limit; split it into multiple smaller transactions.'           ) {}
/* prettier-ignore */ export class ZanoApiTxRejectedError                  extends createApiWalletError(API_RETURN_CODE.TX_REJECTED,                     'ZanoApiTxRejectedError',                  'The transaction was rejected by the network or node.'                                                   ) {}
/* prettier-ignore */ export class ZanoApiHtlcOriginHashMissmatchedError   extends createApiWalletError(API_RETURN_CODE.HTLC_ORIGIN_HASH_MISSMATCHED,    'ZanoApiHtlcOriginHashMissmatchedError',   'The HTLC origin hash does not match the expected value.'                                                ) {}
/* prettier-ignore */ export class ZanoApiWrapError                        extends createApiWalletError(API_RETURN_CODE.WRAP,                            'ZanoApiWrapError',                        'The provided address is a wrapped asset address.'                                                       ) {}
/* prettier-ignore */ export class ZanoApiMissingZcInputsError             extends createApiWalletError(API_RETURN_CODE.MISSING_ZC_INPUTS,               'ZanoApiMissingZcInputsError',             'Required zero-confirmation inputs are missing for this transaction.'                                    ) {}
/* prettier-ignore */ export class ZanoApiArgOutOfLimitsError              extends createApiWalletError(API_RETURN_CODE.ARG_OUT_OF_LIMITS,               'ZanoApiArgOutOfLimitsError',              'One or more arguments fall outside their allowed value limits.'                                         ) {}
/* prettier-ignore */ export class ZanoApiTxHasTooManyOutputsError         extends createApiWalletError(API_RETURN_CODE.TX_HAS_TOO_MANY_OUTPUTS,         'ZanoApiTxHasTooManyOutputsError',         'The transaction contains too many outputs, exceeding the network limit.'                                ) {}
/* prettier-ignore */ export class ZanoApiTxHasTooManyInputsError          extends createApiWalletError(API_RETURN_CODE.TX_HAS_TOO_MANY_INPUTS,          'ZanoApiTxHasTooManyInputsError',          'The number of inputs in the transaction exceeds the network limit; split it into multiple transactions.') {}
/* prettier-ignore */
export const ZanoApiReturnCodeErrors = {
  [API_RETURN_CODE.FAIL]:                            ZanoApiFailError,
  [API_RETURN_CODE.NOT_FOUND]:                       ZanoApiNotFoundError,
  [API_RETURN_CODE.ACCESS_DENIED]:                   ZanoApiAccessDeniedError,
  [API_RETURN_CODE.INTERNAL_ERROR]:                  ZanoApiInternalError,
  [API_RETURN_CODE.NOT_ENOUGH_MONEY]:                ZanoApiNotEnoughMoneyError,
  [API_RETURN_CODE.NOT_ENOUGH_OUTPUTS_FOR_MIXING]:   ZanoApiNotEnoughOutputsForMixingError,
  [API_RETURN_CODE.INTERNAL_ERROR_QUE_FULL]:         ZanoApiInternalErrorQueFullError,
  [API_RETURN_CODE.BAD_ARG]:                         ZanoApiBadArgError,
  [API_RETURN_CODE.BAD_ARG_EMPTY_DESTINATIONS]:      ZanoApiBadArgEmptyDestinationsError,
  [API_RETURN_CODE.BAD_ARG_WRONG_FEE]:               ZanoApiBadArgWrongFeeError,
  [API_RETURN_CODE.BAD_ARG_INVALID_ADDRESS]:         ZanoApiBadArgInvalidAddressError,
  [API_RETURN_CODE.BAD_ARG_WRONG_AMOUNT]:            ZanoApiBadArgWrongAmountError,
  [API_RETURN_CODE.BAD_ARG_UNKNOWN_DECIMAL_POINT]:   ZanoApiBadArgUnknownDecimalPointError,
  [API_RETURN_CODE.BAD_ARG_WRONG_PAYMENT_ID]:        ZanoApiBadArgWrongPaymentIdError,
  [API_RETURN_CODE.BAD_ARG_INVALID_JSON]:            ZanoApiBadArgInvalidJsonError,
  [API_RETURN_CODE.WRONG_PASSWORD]:                  ZanoApiWrongPasswordError,
  [API_RETURN_CODE.WALLET_WRONG_ID]:                 ZanoApiWalletWrongIdError,
  [API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED]: ZanoApiWalletWatchOnlyNotSupportedError,
  [API_RETURN_CODE.WALLET_AUDITABLE_NOT_SUPPORTED]:  ZanoApiWalletAuditableNotSupportedError,
  [API_RETURN_CODE.WALLET_FEE_TOO_LOW]:              ZanoApiWalletFeeTooLowError,
  [API_RETURN_CODE.FILE_NOT_FOUND]:                  ZanoApiFileNotFoundError,
  [API_RETURN_CODE.ALREADY_EXISTS]:                  ZanoApiAlreadyExistsError,
  [API_RETURN_CODE.CANCELED]:                        ZanoApiCanceledError,
  [API_RETURN_CODE.FILE_RESTORED]:                   ZanoApiFileRestoredError,
  [API_RETURN_CODE.TRUE]:                            ZanoApiTrueError,
  [API_RETURN_CODE.FALSE]:                           ZanoApiFalseError,
  [API_RETURN_CODE.CORE_BUSY]:                       ZanoApiCoreBusyError,
  [API_RETURN_CODE.OVERFLOW]:                        ZanoApiOverflowError,
  [API_RETURN_CODE.BUSY]:                            ZanoApiBusyError,
  [API_RETURN_CODE.INVALID_FILE]:                    ZanoApiInvalidFileError,
  [API_RETURN_CODE.WRONG_SEED]:                      ZanoApiWrongSeedError,
  [API_RETURN_CODE.GENESIS_MISMATCH]:                ZanoApiGenesisMismatchError,
  [API_RETURN_CODE.DISCONNECTED]:                    ZanoApiDisconnectedError,
  [API_RETURN_CODE.UNINITIALIZED]:                   ZanoApiUninitializedError,
  [API_RETURN_CODE.TX_IS_TOO_BIG]:                   ZanoApiTxIsTooBigError,
  [API_RETURN_CODE.TX_REJECTED]:                     ZanoApiTxRejectedError,
  [API_RETURN_CODE.HTLC_ORIGIN_HASH_MISSMATCHED]:    ZanoApiHtlcOriginHashMissmatchedError,
  [API_RETURN_CODE.WRAP]:                            ZanoApiWrapError,
  [API_RETURN_CODE.MISSING_ZC_INPUTS]:               ZanoApiMissingZcInputsError,
  [API_RETURN_CODE.ARG_OUT_OF_LIMITS]:               ZanoApiArgOutOfLimitsError,
  [API_RETURN_CODE.TX_HAS_TOO_MANY_OUTPUTS]:         ZanoApiTxHasTooManyOutputsError,
  [API_RETURN_CODE.TX_HAS_TOO_MANY_INPUTS]:          ZanoApiTxHasTooManyInputsError,
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
/* prettier-ignore */ export class ZanoJsonRpcDefaultError        extends createZanoJsonError(JSON_RPC_ERROR_CODE.DEFAULT,          'ZanoJsonRpcDefaultError'       , 'A general error occurred with no additional details.') {}
/* prettier-ignore */ export class ZanoJsonRpcInvalidRequestError extends createZanoJsonError(JSON_RPC_ERROR_CODE.INVALID_REQUEST,  'ZanoJsonRpcInvalidRequestError', 'The request is malformed or does not conform to the specification.') {}
/* prettier-ignore */ export class ZanoJsonRpcMethodNotFoundError extends createZanoJsonError(JSON_RPC_ERROR_CODE.METHOD_NOT_FOUND, 'ZanoJsonRpcMethodNotFoundError', 'The requested method does not exist or is not available.') {}
/* prettier-ignore */ export class ZanoJsonRpcInvalidParamsError  extends createZanoJsonError(JSON_RPC_ERROR_CODE.INVALID_PARAMS,   'ZanoJsonRpcInvalidParamsError' , 'One or more parameters provided are invalid.') {}
/* prettier-ignore */ export class ZanoJsonRpcInternalError       extends createZanoJsonError(JSON_RPC_ERROR_CODE.INTERNAL_ERROR,   'ZanoJsonRpcInternalError'      , 'An internal server error occurred while processing the request.') {}
/* prettier-ignore */ export class ZanoJsonRpcParseError          extends createZanoJsonError(JSON_RPC_ERROR_CODE.PARSE_ERROR,      'ZanoJsonRpcParseError'         , 'The request body could not be parsed.') {}
/* prettier-ignore */
export const ZanoJsonRpcCodeErrors = {
  [JSON_RPC_ERROR_CODE.DEFAULT]:          ZanoJsonRpcDefaultError,
  [JSON_RPC_ERROR_CODE.INVALID_REQUEST]:  ZanoJsonRpcInvalidRequestError,
  [JSON_RPC_ERROR_CODE.METHOD_NOT_FOUND]: ZanoJsonRpcMethodNotFoundError,
  [JSON_RPC_ERROR_CODE.INVALID_PARAMS]:   ZanoJsonRpcInvalidParamsError,
  [JSON_RPC_ERROR_CODE.INTERNAL_ERROR]:   ZanoJsonRpcInternalError,
  [JSON_RPC_ERROR_CODE.PARSE_ERROR]:      ZanoJsonRpcParseError,
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
/* prettier-ignore */ export class ZanoWalletRpcUnknownError                       extends createZanoWalletError(WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR,                     'ZanoWalletRpcUnknownError',                       'An unknown wallet RPC error occurred with no additional details.',                 ) {}
/* prettier-ignore */ export class ZanoWalletRpcWrongAddressError                  extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_ADDRESS,                     'ZanoWalletRpcWrongAddressError',                  'The provided destination address is invalid or malformed.',                        ) {}
/* prettier-ignore */ export class ZanoWalletRpcDaemonIsBusyError                  extends createZanoWalletError(WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY,                    'ZanoWalletRpcDaemonIsBusyError',                  'The Zano daemon is currently busy and unable to process the request.',             ) {}
/* prettier-ignore */ export class ZanoWalletRpcGenericTransferError               extends createZanoWalletError(WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR,            'ZanoWalletRpcGenericTransferError',               'A general error occurred while attempting to transfer funds.',                     ) {}
/* prettier-ignore */ export class ZanoWalletRpcWrongPaymentIdError                extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID,                  'ZanoWalletRpcWrongPaymentIdError',                'The provided payment ID is invalid or malformed.',                                 ) {}
/* prettier-ignore */ export class ZanoWalletRpcWrongArgumentError                 extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT,                    'ZanoWalletRpcWrongArgumentError',                 'One or more arguments provided to the wallet RPC method are invalid.',             ) {}
/* prettier-ignore */ export class ZanoWalletRpcNotEnoughMoneyError                extends createZanoWalletError(WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY,                  'ZanoWalletRpcNotEnoughMoneyError',                'The account does not have sufficient funds to complete the transaction.',          ) {}
/* prettier-ignore */ export class ZanoWalletRpcWrongMixinsForAuditableWalletError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET, 'ZanoWalletRpcWrongMixinsForAuditableWalletError', 'Auditable wallets do not support the specified mixin count for this transaction.', ) {}
/* prettier-ignore */ export class ZanoWalletRpcGenericError                       extends createZanoWalletError(WALLET_RPC_ERROR_CODE.GENERIC_ERROR,                     'ZanoWalletRpcGenericError',                       'A general wallet RPC error occurred while processing the request.',                ) {}
/* prettier-ignore */ export class ZanoWalletRpcKeyImageAlreadySpentError          extends createZanoWalletError(WALLET_RPC_ERROR_CODE.KEY_IMAGE_ALREADY_SPENT,           'ZanoWalletRpcKeyImageAlreadySpentError',          'The key image has already been spent and cannot be used again.',                   ) {}
/* prettier-ignore */
export const ZanoWalletRpcCodeErrors = {
  [WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR]:                     ZanoWalletRpcUnknownError,
  [WALLET_RPC_ERROR_CODE.WRONG_ADDRESS]:                     ZanoWalletRpcWrongAddressError,
  [WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY]:                    ZanoWalletRpcDaemonIsBusyError,
  [WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR]:            ZanoWalletRpcGenericTransferError,
  [WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID]:                  ZanoWalletRpcWrongPaymentIdError,
  [WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT]:                    ZanoWalletRpcWrongArgumentError,
  [WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY]:                  ZanoWalletRpcNotEnoughMoneyError,
  [WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET]: ZanoWalletRpcWrongMixinsForAuditableWalletError,
  [WALLET_RPC_ERROR_CODE.GENERIC_ERROR]:                     ZanoWalletRpcGenericError,
  [WALLET_RPC_ERROR_CODE.KEY_IMAGE_ALREADY_SPENT]:           ZanoWalletRpcKeyImageAlreadySpentError,
};

/* prettier-ignore */ /** @deprecated use {@link ZanoApiInternalError}                            */ export const ZanoInternalError                          = ZanoApiInternalError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiUninitializedError}                       */ export const ZanoUninitializedError                     = ZanoApiUninitializedError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiNotFoundError}                            */ export const ZanoNotFoundError                          = ZanoApiNotFoundError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWrongPasswordError}                       */ export const ZanoWrongPasswordError                     = ZanoApiWrongPasswordError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiInvalidFileError}                         */ export const ZanoInvalidFileError                       = ZanoApiInvalidFileError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiFailError}                                */ export const ZanoFailedError                            = ZanoApiFailError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiFailError}                                */ export const ZanoApiFailedError                         = ZanoApiFailError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiAlreadyExistsError}                       */ export const ZanoAlreadyExistsError                     = ZanoApiAlreadyExistsError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWalletWatchOnlyNotSupportedError}         */ export const ZanoWatchOnlyWalletNotSupported            = ZanoApiWalletWatchOnlyNotSupportedError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWrongSeedError}                           */ export const ZanoWrongSeedError                         = ZanoApiWrongSeedError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiWalletWrongIdError}                       */ export const ZanoWrongWalletIdError                     = ZanoApiWalletWrongIdError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongAddressError}                  */ export const ZanoWalletRpcWrongAddress                  = ZanoWalletRpcWrongAddressError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcDaemonIsBusyError}                  */ export const ZanoWalletRpcDaemonIsBusy                  = ZanoWalletRpcDaemonIsBusyError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongPaymentIdError}                */ export const ZanoWalletRpcWrongPaymentId                = ZanoWalletRpcWrongPaymentIdError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongArgumentError}                 */ export const ZanoWalletRpcWrongArgument                 = ZanoWalletRpcWrongArgumentError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcNotEnoughMoneyError}                */ export const ZanoWalletRpcNotEnoughMoney                = ZanoWalletRpcNotEnoughMoneyError;
/* prettier-ignore */ /** @deprecated use {@link ZanoWalletRpcWrongMixinsForAuditableWalletError} */ export const ZanoWalletRpcWrongMixinsForAuditableWallet = ZanoWalletRpcWrongMixinsForAuditableWalletError;
/* prettier-ignore */ /** @deprecated use {@link ZanoApiBadArgError}                              */ export const ZanoCoreBadArgumentError                   = ZanoApiBadArgError;
/* prettier-ignore */ /** @deprecated use {@link ZanoJsonRpcInvalidRequestError}                  */ export const ZanoWalletRpcInvalidRequest                = ZanoJsonRpcInvalidRequestError;
/* prettier-ignore */ /** @deprecated use {@link ZanoJsonRpcMethodNotFoundError}                  */ export const ZanoWalletRpcMethodNotFound                = ZanoJsonRpcMethodNotFoundError;
/* prettier-ignore */ /** @deprecated use {@link ZanoJsonRpcInvalidParamsError}                   */ export const ZanoWalletRpcInvalidParams                 = ZanoJsonRpcInvalidParamsError;
/* prettier-ignore */ /** @deprecated use {@link ZanoJsonRpcParseError}                           */ export const ZanoWalletRpcParseError                    = ZanoJsonRpcParseError;
