import { ErrorRequestHandler } from 'express';
import { mapValues } from 'lodash';
import { ZodError, ValidationError, HttpError } from 'shared';

export const errorHandler: ErrorRequestHandler = (error, req, res) => {
    console.log('here');
    if (error instanceof HttpError) {
        res.status(error.status).json(error);
        return;
    }

    if (error instanceof ZodError) {
        const fields = mapValues(
            error.flatten().fieldErrors,
            (value) => value?.[0],
        );

        const validationError = new ValidationError(error.message, fields);
        res.status(validationError.status).json(validationError);
        return;
    }

    res.status(500).json('Internal server error');
};
