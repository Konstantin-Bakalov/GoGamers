import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { ReviewModelDetailed } from 'shared';

interface ReviewTestProps {
    review: ReviewModelDetailed;
    isLast: boolean;
    nextPage: () => void;
}

export function ReviewTest({ review, isLast, nextPage }: ReviewTestProps) {
    const ref = useRef();

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                if (isLast && entries[0].isIntersecting) {
                    console.log('last intersecting');
                    nextPage();
                    observer.unobserve(entries[0].target);
                }
            },
        );

        observer.observe(ref.current);
    }, [ref, isLast]);

    return (
        <Box ref={ref} style={{ minHeight: 100 }}>
            {review.body}
        </Box>
    );
}
