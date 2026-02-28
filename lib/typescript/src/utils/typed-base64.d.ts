declare const base64: unique symbol;
export type TypedBase64<Value extends string> = string & {
    [base64]: Value;
};
export type UnwrapTypedBase64<Base64> = Base64 extends TypedBase64<infer Value extends string> ? Value : string;
export {};
//# sourceMappingURL=typed-base64.d.ts.map