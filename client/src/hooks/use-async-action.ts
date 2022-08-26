import { useCallback, useRef, useState } from 'react';

interface AsyncAction<Args extends unknown[], Result> {
    trigger: (...args: Args) => void;
    perform: (...args: Args) => Promise<Result>;
    data: Result | undefined;
    error: unknown;
    loading: boolean;
}

export function useAsyncAction<Args extends unknown[], Result>(
    action: (...args: Args) => Promise<Result>,
): AsyncAction<Args, Result> {
    const [data, setData] = useState<Result>();
    const [error, setError] = useState<unknown>();
    const [loading, setLoading] = useState(false);

    const actionRef = useRef(action);
    actionRef.current = action;

    const perform = useCallback(async (...args: Args) => {
        setError(undefined);
        setLoading(true);

        try {
            const result = await actionRef.current(...args);
            setData(result);

            return result;
        } catch (error) {
            setError(error);

            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const trigger = useCallback((...args: Args) => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        perform(...args).catch(() => {});
    }, []);

    return { trigger, perform, data, error, loading };
}
