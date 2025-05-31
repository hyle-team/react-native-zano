declare const base64: unique symbol;
export type TypedBase64<Value extends string> = string & { [base64]: Value };
export type __UNPROTECTED__TypedBase64<Value> = string & { [base64]: Value };
export type UnwrapTypedBase64<Base64 extends TypedBase64<any>> = Base64 extends TypedBase64<infer Value extends string> ? Value : string;
