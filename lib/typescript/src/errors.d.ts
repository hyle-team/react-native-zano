import { API_RETURN_CODE, JSON_RPC_ERROR_CODE, WALLET_RPC_ERROR_CODE } from './entities';
export declare function createErrorClass(name: string, defaultMessage?: string): {
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
declare const ZanoBindingError_base: {
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
export declare class ZanoBindingError extends ZanoBindingError_base {
}
declare const ZanoStatusError_base: {
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
export declare class ZanoStatusError extends ZanoStatusError_base {
    readonly status: API_RETURN_CODE;
    constructor(status: API_RETURN_CODE, message?: string);
}
declare const ZanoResponseError_base: {
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
export declare abstract class ZanoResponseError extends ZanoResponseError_base {
    abstract readonly code: string | number;
    abstract readonly docsLink: string;
    openInBrowser(): void;
}
declare const ZanoApiFailError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.FAIL;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiFailError extends ZanoApiFailError_base {
}
declare const ZanoApiNotFoundError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.NOT_FOUND;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiNotFoundError extends ZanoApiNotFoundError_base {
}
declare const ZanoApiAccessDeniedError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.ACCESS_DENIED;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiAccessDeniedError extends ZanoApiAccessDeniedError_base {
}
declare const ZanoApiInternalError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.INTERNAL_ERROR;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiInternalError extends ZanoApiInternalError_base {
}
declare const ZanoApiNotEnoughMoneyError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.NOT_ENOUGH_MONEY;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiNotEnoughMoneyError extends ZanoApiNotEnoughMoneyError_base {
}
declare const ZanoApiNotEnoughOutputsForMixingError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.NOT_ENOUGH_OUTPUTS_FOR_MIXING;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiNotEnoughOutputsForMixingError extends ZanoApiNotEnoughOutputsForMixingError_base {
}
declare const ZanoApiInternalErrorQueFullError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.INTERNAL_ERROR_QUE_FULL;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiInternalErrorQueFullError extends ZanoApiInternalErrorQueFullError_base {
}
declare const ZanoApiBadArgError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.BAD_ARG;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiBadArgError extends ZanoApiBadArgError_base {
}
declare const ZanoApiBadArgEmptyDestinationsError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.BAD_ARG_EMPTY_DESTINATIONS;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiBadArgEmptyDestinationsError extends ZanoApiBadArgEmptyDestinationsError_base {
}
declare const ZanoApiBadArgWrongFeeError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.BAD_ARG_WRONG_FEE;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiBadArgWrongFeeError extends ZanoApiBadArgWrongFeeError_base {
}
declare const ZanoApiBadArgInvalidAddressError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.BAD_ARG_INVALID_ADDRESS;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiBadArgInvalidAddressError extends ZanoApiBadArgInvalidAddressError_base {
}
declare const ZanoApiBadArgWrongAmountError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.BAD_ARG_WRONG_AMOUNT;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiBadArgWrongAmountError extends ZanoApiBadArgWrongAmountError_base {
}
declare const ZanoApiBadArgUnknownDecimalPointError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.BAD_ARG_UNKNOWN_DECIMAL_POINT;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiBadArgUnknownDecimalPointError extends ZanoApiBadArgUnknownDecimalPointError_base {
}
declare const ZanoApiBadArgWrongPaymentIdError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.BAD_ARG_WRONG_PAYMENT_ID;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiBadArgWrongPaymentIdError extends ZanoApiBadArgWrongPaymentIdError_base {
}
declare const ZanoApiBadArgInvalidJsonError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.BAD_ARG_INVALID_JSON;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiBadArgInvalidJsonError extends ZanoApiBadArgInvalidJsonError_base {
}
declare const ZanoApiWrongPasswordError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.WRONG_PASSWORD;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiWrongPasswordError extends ZanoApiWrongPasswordError_base {
}
declare const ZanoApiWalletWrongIdError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.WALLET_WRONG_ID;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiWalletWrongIdError extends ZanoApiWalletWrongIdError_base {
}
declare const ZanoApiWalletWatchOnlyNotSupportedError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.WALLET_WATCH_ONLY_NOT_SUPPORTED;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiWalletWatchOnlyNotSupportedError extends ZanoApiWalletWatchOnlyNotSupportedError_base {
}
declare const ZanoApiWalletAuditableNotSupportedError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.WALLET_AUDITABLE_NOT_SUPPORTED;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiWalletAuditableNotSupportedError extends ZanoApiWalletAuditableNotSupportedError_base {
}
declare const ZanoApiWalletFeeTooLowError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.WALLET_FEE_TOO_LOW;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiWalletFeeTooLowError extends ZanoApiWalletFeeTooLowError_base {
}
declare const ZanoApiFileNotFoundError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.FILE_NOT_FOUND;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiFileNotFoundError extends ZanoApiFileNotFoundError_base {
}
declare const ZanoApiAlreadyExistsError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.ALREADY_EXISTS;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiAlreadyExistsError extends ZanoApiAlreadyExistsError_base {
}
declare const ZanoApiCanceledError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.CANCELED;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiCanceledError extends ZanoApiCanceledError_base {
}
declare const ZanoApiFileRestoredError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.FILE_RESTORED;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiFileRestoredError extends ZanoApiFileRestoredError_base {
}
declare const ZanoApiTrueError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.TRUE;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiTrueError extends ZanoApiTrueError_base {
}
declare const ZanoApiFalseError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.FALSE;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiFalseError extends ZanoApiFalseError_base {
}
declare const ZanoApiCoreBusyError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.CORE_BUSY;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiCoreBusyError extends ZanoApiCoreBusyError_base {
}
declare const ZanoApiOverflowError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.OVERFLOW;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiOverflowError extends ZanoApiOverflowError_base {
}
declare const ZanoApiBusyError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.BUSY;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiBusyError extends ZanoApiBusyError_base {
}
declare const ZanoApiInvalidFileError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.INVALID_FILE;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiInvalidFileError extends ZanoApiInvalidFileError_base {
}
declare const ZanoApiWrongSeedError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.WRONG_SEED;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiWrongSeedError extends ZanoApiWrongSeedError_base {
}
declare const ZanoApiGenesisMismatchError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.GENESIS_MISMATCH;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiGenesisMismatchError extends ZanoApiGenesisMismatchError_base {
}
declare const ZanoApiDisconnectedError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.DISCONNECTED;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiDisconnectedError extends ZanoApiDisconnectedError_base {
}
declare const ZanoApiUninitializedError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.UNINITIALIZED;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiUninitializedError extends ZanoApiUninitializedError_base {
}
declare const ZanoApiTxIsTooBigError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.TX_IS_TOO_BIG;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiTxIsTooBigError extends ZanoApiTxIsTooBigError_base {
}
declare const ZanoApiTxRejectedError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.TX_REJECTED;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiTxRejectedError extends ZanoApiTxRejectedError_base {
}
declare const ZanoApiHtlcOriginHashMissmatchedError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.HTLC_ORIGIN_HASH_MISSMATCHED;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiHtlcOriginHashMissmatchedError extends ZanoApiHtlcOriginHashMissmatchedError_base {
}
declare const ZanoApiWrapError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.WRAP;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiWrapError extends ZanoApiWrapError_base {
}
declare const ZanoApiMissingZcInputsError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.MISSING_ZC_INPUTS;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiMissingZcInputsError extends ZanoApiMissingZcInputsError_base {
}
declare const ZanoApiArgOutOfLimitsError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.ARG_OUT_OF_LIMITS;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiArgOutOfLimitsError extends ZanoApiArgOutOfLimitsError_base {
}
declare const ZanoApiTxHasTooManyOutputsError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.TX_HAS_TOO_MANY_OUTPUTS;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiTxHasTooManyOutputsError extends ZanoApiTxHasTooManyOutputsError_base {
}
declare const ZanoApiTxHasTooManyInputsError_base: {
    new (message?: string): {
        readonly code: API_RETURN_CODE.TX_HAS_TOO_MANY_INPUTS;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoApiTxHasTooManyInputsError extends ZanoApiTxHasTooManyInputsError_base {
}
export declare const ZanoApiReturnCodeErrors: {
    FAILED: typeof ZanoApiFailError;
    NOT_FOUND: typeof ZanoApiNotFoundError;
    ACCESS_DENIED: typeof ZanoApiAccessDeniedError;
    INTERNAL_ERROR: typeof ZanoApiInternalError;
    NOT_ENOUGH_MONEY: typeof ZanoApiNotEnoughMoneyError;
    NOT_ENOUGH_OUTPUTS_FOR_MIXING: typeof ZanoApiNotEnoughOutputsForMixingError;
    INTERNAL_ERROR_QUE_FULL: typeof ZanoApiInternalErrorQueFullError;
    BAD_ARG: typeof ZanoApiBadArgError;
    BAD_ARG_EMPTY_DESTINATIONS: typeof ZanoApiBadArgEmptyDestinationsError;
    BAD_ARG_WRONG_FEE: typeof ZanoApiBadArgWrongFeeError;
    BAD_ARG_INVALID_ADDRESS: typeof ZanoApiBadArgInvalidAddressError;
    BAD_ARG_WRONG_AMOUNT: typeof ZanoApiBadArgWrongAmountError;
    BAD_ARG_UNKNOWN_DECIMAL_POINT: typeof ZanoApiBadArgUnknownDecimalPointError;
    BAD_ARG_WRONG_PAYMENT_ID: typeof ZanoApiBadArgWrongPaymentIdError;
    BAD_ARG_INVALID_JSON: typeof ZanoApiBadArgInvalidJsonError;
    WRONG_PASSWORD: typeof ZanoApiWrongPasswordError;
    WALLET_WRONG_ID: typeof ZanoApiWalletWrongIdError;
    WALLET_WATCH_ONLY_NOT_SUPPORTED: typeof ZanoApiWalletWatchOnlyNotSupportedError;
    WALLET_AUDITABLE_NOT_SUPPORTED: typeof ZanoApiWalletAuditableNotSupportedError;
    API_RETURN_CODE_WALLET_FEE_TOO_LOW: typeof ZanoApiWalletFeeTooLowError;
    FILE_NOT_FOUND: typeof ZanoApiFileNotFoundError;
    ALREADY_EXISTS: typeof ZanoApiAlreadyExistsError;
    CANCELED: typeof ZanoApiCanceledError;
    FILE_RESTORED: typeof ZanoApiFileRestoredError;
    TRUE: typeof ZanoApiTrueError;
    FALSE: typeof ZanoApiFalseError;
    CORE_BUSY: typeof ZanoApiCoreBusyError;
    OVERFLOW: typeof ZanoApiOverflowError;
    BUSY: typeof ZanoApiBusyError;
    INVALID_FILE: typeof ZanoApiInvalidFileError;
    WRONG_SEED: typeof ZanoApiWrongSeedError;
    GENESIS_MISMATCH: typeof ZanoApiGenesisMismatchError;
    DISCONNECTED: typeof ZanoApiDisconnectedError;
    UNINITIALIZED: typeof ZanoApiUninitializedError;
    TX_IS_TOO_BIG: typeof ZanoApiTxIsTooBigError;
    TX_REJECTED: typeof ZanoApiTxRejectedError;
    HTLC_ORIGIN_HASH_MISSMATCHED: typeof ZanoApiHtlcOriginHashMissmatchedError;
    WRAP: typeof ZanoApiWrapError;
    MISSING_ZC_INPUTS: typeof ZanoApiMissingZcInputsError;
    ARG_OUT_OF_LIMITS: typeof ZanoApiArgOutOfLimitsError;
    TX_HAS_TOO_MANY_OUTPUTS: typeof ZanoApiTxHasTooManyOutputsError;
    TX_HAS_TOO_MANY_INPUTS: typeof ZanoApiTxHasTooManyInputsError;
};
declare const ZanoJsonRpcDefaultError_base: {
    new (message?: string): {
        readonly code: JSON_RPC_ERROR_CODE.DEFAULT;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoJsonRpcDefaultError extends ZanoJsonRpcDefaultError_base {
}
declare const ZanoJsonRpcInvalidRequestError_base: {
    new (message?: string): {
        readonly code: JSON_RPC_ERROR_CODE.INVALID_REQUEST;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoJsonRpcInvalidRequestError extends ZanoJsonRpcInvalidRequestError_base {
}
declare const ZanoJsonRpcMethodNotFoundError_base: {
    new (message?: string): {
        readonly code: JSON_RPC_ERROR_CODE.METHOD_NOT_FOUND;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoJsonRpcMethodNotFoundError extends ZanoJsonRpcMethodNotFoundError_base {
}
declare const ZanoJsonRpcInvalidParamsError_base: {
    new (message?: string): {
        readonly code: JSON_RPC_ERROR_CODE.INVALID_PARAMS;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoJsonRpcInvalidParamsError extends ZanoJsonRpcInvalidParamsError_base {
}
declare const ZanoJsonRpcInternalError_base: {
    new (message?: string): {
        readonly code: JSON_RPC_ERROR_CODE.INTERNAL_ERROR;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoJsonRpcInternalError extends ZanoJsonRpcInternalError_base {
}
declare const ZanoJsonRpcParseError_base: {
    new (message?: string): {
        readonly code: JSON_RPC_ERROR_CODE.PARSE_ERROR;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoJsonRpcParseError extends ZanoJsonRpcParseError_base {
}
export declare const ZanoJsonRpcCodeErrors: {
    [-32000]: typeof ZanoJsonRpcDefaultError;
    [-32600]: typeof ZanoJsonRpcInvalidRequestError;
    [-32601]: typeof ZanoJsonRpcMethodNotFoundError;
    [-32602]: typeof ZanoJsonRpcInvalidParamsError;
    [-32603]: typeof ZanoJsonRpcInternalError;
    [-32700]: typeof ZanoJsonRpcParseError;
};
declare const ZanoWalletRpcUnknownError_base: {
    new (message?: string): {
        readonly code: WALLET_RPC_ERROR_CODE.UNKNOWN_ERROR;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoWalletRpcUnknownError extends ZanoWalletRpcUnknownError_base {
}
declare const ZanoWalletRpcWrongAddressError_base: {
    new (message?: string): {
        readonly code: WALLET_RPC_ERROR_CODE.WRONG_ADDRESS;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoWalletRpcWrongAddressError extends ZanoWalletRpcWrongAddressError_base {
}
declare const ZanoWalletRpcDaemonIsBusyError_base: {
    new (message?: string): {
        readonly code: WALLET_RPC_ERROR_CODE.DAEMON_IS_BUSY;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoWalletRpcDaemonIsBusyError extends ZanoWalletRpcDaemonIsBusyError_base {
}
declare const ZanoWalletRpcGenericTransferError_base: {
    new (message?: string): {
        readonly code: WALLET_RPC_ERROR_CODE.GENERIC_TRANSFER_ERROR;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoWalletRpcGenericTransferError extends ZanoWalletRpcGenericTransferError_base {
}
declare const ZanoWalletRpcWrongPaymentIdError_base: {
    new (message?: string): {
        readonly code: WALLET_RPC_ERROR_CODE.WRONG_PAYMENT_ID;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoWalletRpcWrongPaymentIdError extends ZanoWalletRpcWrongPaymentIdError_base {
}
declare const ZanoWalletRpcWrongArgumentError_base: {
    new (message?: string): {
        readonly code: WALLET_RPC_ERROR_CODE.WRONG_ARGUMENT;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoWalletRpcWrongArgumentError extends ZanoWalletRpcWrongArgumentError_base {
}
declare const ZanoWalletRpcNotEnoughMoneyError_base: {
    new (message?: string): {
        readonly code: WALLET_RPC_ERROR_CODE.NOT_ENOUGH_MONEY;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoWalletRpcNotEnoughMoneyError extends ZanoWalletRpcNotEnoughMoneyError_base {
}
declare const ZanoWalletRpcWrongMixinsForAuditableWalletError_base: {
    new (message?: string): {
        readonly code: WALLET_RPC_ERROR_CODE.WRONG_MIXINS_FOR_AUDITABLE_WALLET;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoWalletRpcWrongMixinsForAuditableWalletError extends ZanoWalletRpcWrongMixinsForAuditableWalletError_base {
}
declare const ZanoWalletRpcGenericError_base: {
    new (message?: string): {
        readonly code: WALLET_RPC_ERROR_CODE.GENERIC_ERROR;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoWalletRpcGenericError extends ZanoWalletRpcGenericError_base {
}
declare const ZanoWalletRpcKeyImageAlreadySpentError_base: {
    new (message?: string): {
        readonly code: WALLET_RPC_ERROR_CODE.KEY_IMAGE_ALREADY_SPENT;
        readonly docsLink: string;
        openInBrowser(): void;
        name: string;
        message: string;
        stack?: string;
        cause?: unknown;
    };
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
};
export declare class ZanoWalletRpcKeyImageAlreadySpentError extends ZanoWalletRpcKeyImageAlreadySpentError_base {
}
export declare const ZanoWalletRpcCodeErrors: {
    [-1]: typeof ZanoWalletRpcUnknownError;
    [-2]: typeof ZanoWalletRpcWrongAddressError;
    [-3]: typeof ZanoWalletRpcDaemonIsBusyError;
    [-4]: typeof ZanoWalletRpcGenericTransferError;
    [-5]: typeof ZanoWalletRpcWrongPaymentIdError;
    [-6]: typeof ZanoWalletRpcWrongArgumentError;
    [-7]: typeof ZanoWalletRpcNotEnoughMoneyError;
    [-8]: typeof ZanoWalletRpcWrongMixinsForAuditableWalletError;
    [-9]: typeof ZanoWalletRpcGenericError;
    [-10]: typeof ZanoWalletRpcKeyImageAlreadySpentError;
};
/** @deprecated use {@link ZanoApiInternalError}                            */ export declare const ZanoInternalError: typeof ZanoApiInternalError;
/** @deprecated use {@link ZanoApiUninitializedError}                       */ export declare const ZanoUninitializedError: typeof ZanoApiUninitializedError;
/** @deprecated use {@link ZanoApiNotFoundError}                            */ export declare const ZanoNotFoundError: typeof ZanoApiNotFoundError;
/** @deprecated use {@link ZanoApiWrongPasswordError}                       */ export declare const ZanoWrongPasswordError: typeof ZanoApiWrongPasswordError;
/** @deprecated use {@link ZanoApiInvalidFileError}                         */ export declare const ZanoInvalidFileError: typeof ZanoApiInvalidFileError;
/** @deprecated use {@link ZanoApiFailError}                                */ export declare const ZanoFailedError: typeof ZanoApiFailError;
/** @deprecated use {@link ZanoApiFailError}                                */ export declare const ZanoApiFailedError: typeof ZanoApiFailError;
/** @deprecated use {@link ZanoApiAlreadyExistsError}                       */ export declare const ZanoAlreadyExistsError: typeof ZanoApiAlreadyExistsError;
/** @deprecated use {@link ZanoApiWalletWatchOnlyNotSupportedError}         */ export declare const ZanoWatchOnlyWalletNotSupported: typeof ZanoApiWalletWatchOnlyNotSupportedError;
/** @deprecated use {@link ZanoApiWrongSeedError}                           */ export declare const ZanoWrongSeedError: typeof ZanoApiWrongSeedError;
/** @deprecated use {@link ZanoApiWalletWrongIdError}                       */ export declare const ZanoWrongWalletIdError: typeof ZanoApiWalletWrongIdError;
/** @deprecated use {@link ZanoWalletRpcWrongAddressError}                  */ export declare const ZanoWalletRpcWrongAddress: typeof ZanoWalletRpcWrongAddressError;
/** @deprecated use {@link ZanoWalletRpcDaemonIsBusyError}                  */ export declare const ZanoWalletRpcDaemonIsBusy: typeof ZanoWalletRpcDaemonIsBusyError;
/** @deprecated use {@link ZanoWalletRpcWrongPaymentIdError}                */ export declare const ZanoWalletRpcWrongPaymentId: typeof ZanoWalletRpcWrongPaymentIdError;
/** @deprecated use {@link ZanoWalletRpcWrongArgumentError}                 */ export declare const ZanoWalletRpcWrongArgument: typeof ZanoWalletRpcWrongArgumentError;
/** @deprecated use {@link ZanoWalletRpcNotEnoughMoneyError}                */ export declare const ZanoWalletRpcNotEnoughMoney: typeof ZanoWalletRpcNotEnoughMoneyError;
/** @deprecated use {@link ZanoWalletRpcWrongMixinsForAuditableWalletError} */ export declare const ZanoWalletRpcWrongMixinsForAuditableWallet: typeof ZanoWalletRpcWrongMixinsForAuditableWalletError;
/** @deprecated use {@link ZanoApiBadArgError}                              */ export declare const ZanoCoreBadArgumentError: typeof ZanoApiBadArgError;
/** @deprecated use {@link ZanoJsonRpcInvalidRequestError}                  */ export declare const ZanoWalletRpcInvalidRequest: typeof ZanoJsonRpcInvalidRequestError;
/** @deprecated use {@link ZanoJsonRpcMethodNotFoundError}                  */ export declare const ZanoWalletRpcMethodNotFound: typeof ZanoJsonRpcMethodNotFoundError;
/** @deprecated use {@link ZanoJsonRpcInvalidParamsError}                   */ export declare const ZanoWalletRpcInvalidParams: typeof ZanoJsonRpcInvalidParamsError;
/** @deprecated use {@link ZanoJsonRpcParseError}                           */ export declare const ZanoWalletRpcParseError: typeof ZanoJsonRpcParseError;
export {};
//# sourceMappingURL=errors.d.ts.map