export type JSONValue = string | number | null | boolean | { [prop: string]: JSONValue } | JSONValue[];
export type JSONConstrain<T> = {
  [P in keyof T]: T[P] extends JSONValue ? T[P] : T[P] extends (() => any) | undefined ? never : JSONConstrain<T[P]>;
};

declare const json: unique symbol;
export type TypedJSON<Value extends JSONConstrain<Value>> = string & { [json]: Value };
export type __UNPROTECTED__TypedJSON<Value> = string & { [json]: Value };
export type UnwrapTypedJSON<JSON> = JSON extends TypedJSON<infer Value extends JSONConstrain<Value>> ? Value : never;

export const TypedJSON: {
  parse<Text>(text: Text): UnwrapTypedJSON<Text>;
  stringify<Value extends JSONConstrain<Value>>(value: NoInfer<Value>): TypedJSON<Value>;
} = JSON as never;
