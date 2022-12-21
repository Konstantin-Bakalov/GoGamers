import { useEffect, useState } from 'react';
import { ForbiddenError, ValidationError } from 'shared';

export interface ValidationErrorMessage {
    name?: string;
    developer?: string;
    price?: string;
    description?: string;
    releaseDate?: string;
    genres?: string;
    media?: string;
}

interface ValidationProps {
    error: unknown;
}

export function useValidation({ error }: ValidationProps) {
    const [validationError, setValidationError] = useState<
        ValidationErrorMessage | undefined
    >(undefined);

    const [forbiddenError, setForbiddenError] = useState<string | undefined>(
        undefined,
    );

    useEffect(() => {
        if (!error) {
            setValidationError(undefined);
        }

        if (error instanceof ValidationError) {
            setValidationError(error.data);
            return;
        }

        if (error instanceof ForbiddenError) {
            setForbiddenError(error.message);
            return;
        }

        setValidationError(undefined);
    }, [error]);

    return { validationError, forbiddenError };
}
