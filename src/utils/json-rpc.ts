import type { JSONConstrain, JSONValue } from './typed-json';

export type JSONRpc = {
  jsonrpc: '2.0';
};

export type JSONRpcRequest<Method extends string = string, Params extends JSONConstrain<Params> = any> = JSONRpc & {
  id: string;
  method: Method;
  params: Params;
};

export type JSONRpcNotification<Method extends string = string, Params extends JSONConstrain<Params> = any> = JSONRpc & {
  method: Method;
  params: Params;
};

export type JSONRpcSuccessfulResponse<Result extends JSONConstrain<Result> = JSONValue> = JSONRpc & {
  id: string;
  result: Result;
  error: null;
};

export type JSONRpcFailedResponse<Error extends JSONConstrain<Error> = JSONValue> = Error extends any
  ? JSONRpc & {
      id: string;
      result: null;
      error: Error;
    }
  : never;

export type JSONRpcResponse<Result extends JSONConstrain<Result> = JSONValue, Error extends JSONConstrain<Error> = JSONValue> =
  | JSONRpcSuccessfulResponse<Result>
  | JSONRpcFailedResponse<Error>;

export type AnyJSONRpcResponse = JSONRpc & {
  id: string;
  result: unknown;
  error: unknown;
};
