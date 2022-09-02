interface HttpErrorOptions {
    name: string;
    status: number;
    message: string;
    data?: any;
}

export enum ErrorName {
    ValidationError = 'Validation Error',
}

export abstract class HttpError implements Error {
    name: string;
    status: number;
    message: string;
    data?: unknown;

    constructor({ name, status, message, data }: HttpErrorOptions) {
        this.name = name;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

export class ValidationError extends HttpError {
    constructor(message: string, fields?: Record<string, string>) {
        super({
            name: ErrorName.ValidationError,
            status: 400,
            message,
            data: fields,
        });
    }
}
