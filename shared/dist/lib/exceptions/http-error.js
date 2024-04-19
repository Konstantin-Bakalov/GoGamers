"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnknownError = exports.GenericError = exports.ForbiddenError = exports.ValidationError = exports.HttpError = exports.ErrorName = void 0;
var ErrorName;
(function (ErrorName) {
    ErrorName["ValidationError"] = "Validation Error";
    ErrorName["ForbiddenError"] = "Forbidden Error";
    ErrorName["GenericError"] = "Generic Error";
})(ErrorName = exports.ErrorName || (exports.ErrorName = {}));
class HttpError {
    constructor({ name, status, message, data }) {
        this.name = name;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
exports.HttpError = HttpError;
class ValidationError extends HttpError {
    constructor(message, fields) {
        super({
            name: ErrorName.ValidationError,
            status: 400,
            message,
            data: fields,
        });
    }
}
exports.ValidationError = ValidationError;
class ForbiddenError extends HttpError {
    constructor(message, fields) {
        super({
            name: ErrorName.ForbiddenError,
            status: 403,
            message,
            data: fields,
        });
    }
}
exports.ForbiddenError = ForbiddenError;
class GenericError extends HttpError {
    constructor(message, data) {
        super({ name: ErrorName.GenericError, status: 500, message, data });
    }
}
exports.GenericError = GenericError;
class UnknownError extends HttpError {
    constructor(name, data) {
        super({
            name,
            status: 500,
            message: 'The application has encountered an unknown error.',
            data,
        });
    }
}
exports.UnknownError = UnknownError;
