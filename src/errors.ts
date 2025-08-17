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
export class ZanoWalletRpcUnknownError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR, 'ZanoWalletRpcUnknownError') {}
export class ZanoWalletRpcWrongAddressError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_ADDRESS, 'ZanoWalletRpcWrongAddressError') {}
export class ZanoWalletRpcDaemonIsBusyError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY, 'ZanoWalletRpcDaemonIsBusyError') {}
export class ZanoWalletRpcGenericTransferError extends createZanoWalletError(
  WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR,
  'ZanoWalletRpcGenericTransferError'
) {}
export class ZanoWalletRpcWrongPaymentIdError extends createZanoWalletError(
  WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID,
  'ZanoWalletRpcWrongPaymentIdError'
) {}
export class ZanoWalletRpcWrongArgumentError extends createZanoWalletError(WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT, 'ZanoWalletRpcWrongArgumentError') {}
export class ZanoWalletRpcNotEnoughMoneyError extends createZanoWalletError(
  WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY,
  'ZanoWalletRpcNotEnoughMoneyError'
) {}
export class ZanoWalletRpcWrongMixinsForAuditableWalletError extends createZanoWalletError(
  WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET,
  'ZanoWalletRpcWrongMixinsForAuditableWalletError'
) {}

export class ZanoCoreBadArgumentError extends createErrorClass('ZanoCoreBadArgumentError', API_RETURN_CODE.BAD_ARG_INVALID_JSON) {}
