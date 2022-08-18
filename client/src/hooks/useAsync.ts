import { useEffect } from 'react';

export function useAsync<T>(
    action: () => Promise<T>,
    callback: (newValue: T) => void
) {
    return useEffect(() => {
        let isCancelled = false;

        action().then((result) => {
            if (!isCancelled) {
                callback(result);
            }
        });

        return () => {
            isCancelled = true;
        };
    }, []);
}
