export type JSONValue = string | number | null | boolean | { [prop: string]: JSONValue } | JSONValue[];
export type JSONConstrain<T> = {
  [P in keyof T]: T[P] extends JSONValue ? T[P] : T[P] extends (() => any) | undefined ? never : JSONConstrain<T[P]>;
};

declare const json: unique symbol;
export type TypedJSON<Value extends JSONConstrain<Value>> = string & { [json]: Value };
export type __UNPROTECTED__TypedJSON<Value> = string & { [json]: Value };
export type UnwrapTypedJSON<JSON extends TypedJSON<any>> = JSON extends TypedJSON<infer Value extends JSONConstrain<Value>> ? Value : JSONValue;

export const TypedJSON: {
  parse<Text extends TypedJSON<JSONValue>>(text: Text): UnwrapTypedJSON<Text>;
  stringify<Value extends JSONConstrain<Value>>(value: NoInfer<Value>): TypedJSON<Value>;
} = JSON.parse as never;
