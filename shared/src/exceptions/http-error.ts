interface HttpErrorOptions {
    name: string;
    status: number;
    message: string;
    data?: any;
}

export enum ErrorName {
    ValidationError = 'Validation Error',
    ForbiddenError = 'Forbidden Error',
    GenericError = 'Generic Error',
}

export abstract class HttpError implements Error {
    name: string;
    status: number;
    message: string;
    data?: any;

    constructor({ name, status, message, data }: HttpErrorOptions) {
        this.name = name;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

export class ValidationError extends HttpError {
    constructor(message: string, fields?: Record<string, string | undefined>) {
        super({
            name: ErrorName.ValidationError,
            status: 400,
            message,
            data: fields,
        });
    }
}

export class ForbiddenError extends HttpError {
    constructor(message: string, fields?: Record<string, string | undefined>) {
        super({
            name: ErrorName.ForbiddenError,
            status: 403,
            message,
            data: fields,
        });
    }
}

export class GenericError extends HttpError {
    constructor(message: string, data: any) {
        super({ name: ErrorName.GenericError, status: 500, message, data });
    }
}

export class UnknownError extends HttpError {
    constructor(name: string, data: any) {
        super({
            name,
            status: 500,
            message: 'The application has encountered an unknown error.',
            data,
        });
    }
}
