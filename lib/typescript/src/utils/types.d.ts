import type { HybridObject } from 'react-native-nitro-modules';
export type DeepReadonly<T> = T extends object ? {
    readonly [K in keyof T]: DeepReadonly<T[K]>;
} : T;
export type Promisify<T extends object, Excluded extends keyof T = never> = {
    [K in Exclude<keyof T, keyof HybridObject | Excluded>]: T[K] extends (...params: infer Params extends unknown[]) => infer Result ? Result extends Promise<unknown> ? T[K] : (...params: Params) => Promise<Result> : T[K];
} & Omit<T, Exclude<keyof T, keyof HybridObject | Excluded>>;
declare global {
    interface RNZano {
    }
}
export type IfWeb<T, U = never> = 'enable_rnzano_web' extends keyof RNZano ? T : U;
//# sourceMappingURL=types.d.ts.map