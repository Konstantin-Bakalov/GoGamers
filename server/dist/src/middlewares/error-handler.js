"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const lodash_1 = require("lodash");
const shared_1 = require("shared");
// need to disable this rule so that express recognises this signature
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, req, res, _next) => {
    if (err instanceof shared_1.HttpError) {
        res.status(err.status).json(err);
        return;
    }
    if (err instanceof shared_1.ZodError) {
        const fields = (0, lodash_1.mapValues)(err.flatten().fieldErrors, (value) => value === null || value === void 0 ? void 0 : value[0]);
        const validationError = new shared_1.ValidationError(err.message, fields);
        res.status(validationError.status).json(validationError);
        return;
    }
    console.log('error', err);
    res.status(500).json({ message: 'Internal server error' });
};
exports.errorHandler = errorHandler;
