import { Box } from '@mui/material';
import { ReviewModelDetailed } from 'shared';
import { makeStyles } from '../lib/make-styles';
import { Review } from './review';

export interface ReviewListProps {
    reviews: ReviewModelDetailed[] | undefined;
    nextPage: () => void;
}

const styles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
});

export function ReviewList({ reviews, nextPage }: ReviewListProps) {
    return (
        <Box sx={styles.container}>
            {reviews?.map((review, index) => (
                <Review
                    key={review.id}
                    review={review}
                    isLast={index === reviews.length - 1}
                    nextPage={nextPage}
                />
            ))}
        </Box>
    );
}
