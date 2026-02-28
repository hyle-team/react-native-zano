"use strict";

import { API_RETURN_CODE, WALLET_RPC_ERROR_CODE } from "./entities.js";
import { createErrorClass, ZanoApiBadArgInvalidJsonError, ZanoApiInternalError, ZanoApiReturnCodeErrors, ZanoJsonRpcCodeErrors, ZanoWalletRpcCodeErrors, ZanoWalletRpcUnknownError } from "./errors.js";
const responses = new WeakMap();
export const errorWithResponse = (error, response) => {
  responses.set(error, response);
  return error;
};
export const getErrorResponse = error => responses.get(error);
function returnApiErrorToCode(code, message) {
  if (!(code in ZanoApiReturnCodeErrors)) return new ZanoApiInternalError(message);
  const Error = ZanoApiReturnCodeErrors[code];
  return new Error(message);
}
function returnJsonRpcErrorToCode(code, message) {
  if (!(code in ZanoJsonRpcCodeErrors)) return undefined;
  const Error = ZanoJsonRpcCodeErrors[code];
  return new Error(message);
}
function returnWalletRpcErrorToCode(code, message) {
  if (!(code in ZanoWalletRpcCodeErrors)) return new ZanoWalletRpcUnknownError(message);
  if (code === WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR) {
    if (message) return returnApiErrorToCode(message);
    return new ZanoWalletRpcUnknownError(message);
  }
  const Error = ZanoWalletRpcCodeErrors[code];
  return new Error(message);
}
export function assertJSONRpcReturnCode(response, messages) {
  if (!('result' in response)) return;
  const {
    result
  } = response;
  if (typeof result !== 'object' || result === null || !('return_code' in result)) return;
  const {
    return_code
  } = result;
  if (typeof return_code !== 'string') return;
  if (return_code === API_RETURN_CODE.OK) return;
  const message = messages?.[return_code];
  if (typeof message === 'function') throw errorWithResponse(message(), response);
  throw errorWithResponse(returnApiErrorToCode(return_code, message), response);
}
export class JSONRpcError extends createErrorClass('JSONRpcError') {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
export function assertJSONRpcErrorCode(response, messages) {
  if (!('error' in response)) return;
  const {
    error
  } = response;
  if (typeof error !== 'object' || error === null || !('code' in error)) return;
  const {
    code
  } = error;
  const message = messages?.[code] ?? ('message' in error ? String(error.message) || undefined : undefined);
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
export function assertStatusCodeApiReturnCode(response, messages) {
  if (!('status' in response)) return;
  const {
    status
  } = response;
  if (typeof status !== 'string') return;
  if (status === API_RETURN_CODE.OK) return;
  const message = messages?.[status];
  if (typeof message === 'function') throw errorWithResponse(message(), response);
  throw errorWithResponse(returnApiErrorToCode(status, message), response);
}
export function assertErrorCodeApiReturnCode(response, messages) {
  if (!('error_code' in response)) return;
  const {
    error_code
  } = response;
  if (typeof error_code !== 'string') return;
  const message = messages?.[error_code];
  if (typeof message === 'function') throw errorWithResponse(message(), response);
  if (error_code === API_RETURN_CODE.BAD_ARG_INVALID_JSON) throw errorWithResponse(new ZanoApiBadArgInvalidJsonError(), response);
  throw errorWithResponse(returnApiErrorToCode(error_code), response);
}
//# sourceMappingURL=asserts.js.map