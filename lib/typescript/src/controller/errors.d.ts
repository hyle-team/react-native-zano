declare const ZanoControllerAlreadyInitiated_base: {
    new (message?: string): {
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoControllerAlreadyInitiated extends ZanoControllerAlreadyInitiated_base {
}
declare const ZanoControllerFailedToInitialize_base: {
    new (message?: string): {
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoControllerFailedToInitialize extends ZanoControllerFailedToInitialize_base {
}
declare const ZanoControllerInvalidDaemonURL_base: {
    new (message?: string): {
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoControllerInvalidDaemonURL extends ZanoControllerInvalidDaemonURL_base {
}
export {};
//# sourceMappingURL=errors.d.ts.map