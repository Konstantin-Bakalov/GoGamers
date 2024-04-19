interface HttpErrorOptions {
    name: string;
    status: number;
    message: string;
    data?: any;
}
export declare enum ErrorName {
    ValidationError = "Validation Error",
    ForbiddenError = "Forbidden Error",
    GenericError = "Generic Error"
}
export declare abstract class HttpError implements Error {
    name: string;
    status: number;
    message: string;
    data?: any;
    constructor({ name, status, message, data }: HttpErrorOptions);
}
export declare class ValidationError extends HttpError {
    constructor(message: string, fields?: Record<string, string | undefined>);
}
export declare class ForbiddenError extends HttpError {
    constructor(message: string, fields?: Record<string, string | undefined>);
}
export declare class GenericError extends HttpError {
    constructor(message: string, data: any);
}
export declare class UnknownError extends HttpError {
    constructor(name: string, data: any);
}
export {};
