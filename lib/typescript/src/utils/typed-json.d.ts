export type JSONValue = string | number | null | boolean | {
    [prop: string]: JSONValue;
} | JSONValue[];
declare const json: unique symbol;
export type TypedJSON<Value> = string & {
    [json]: Value;
};
export type UnwrapTypedJSON<JSON> = JSON extends TypedJSON<any> ? JSON[typeof json] : never;
export declare const TypedJSON: {
    parse<Text>(text: Text): UnwrapTypedJSON<Text>;
    stringify<Value>(value: NoInfer<Value>): TypedJSON<Value>;
};
export {};
//# sourceMappingURL=typed-json.d.ts.map