import { MutableRefObject, useEffect, useState } from 'react';

export function useObserver(
    ref: MutableRefObject<HTMLDivElement | undefined>,
    options: IntersectionObserverInit,
) {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();
    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                setEntry(entries[0]);
                if (entries[0].isIntersecting) {
                    observer.unobserve(entries[0].target);
                }
            },
            options,
        );

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return entry;
}
