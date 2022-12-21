import { useEffect, useState } from 'react';
import { ValidationError } from 'shared';

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

    useEffect(() => {
        if (!error) {
            setValidationError(undefined);
        }

        if (error instanceof ValidationError) {
            setValidationError(error.data);
            return;
        }

        setValidationError(undefined);
    }, [error]);

    return { validationError };
}
