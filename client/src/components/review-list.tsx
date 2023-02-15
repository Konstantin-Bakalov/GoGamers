import { Box } from '@mui/material';
import { ReviewModelDetailed } from 'shared';
import { Review } from './review';

interface ReviewListProps {
    reviews: ReviewModelDetailed[] | undefined;
    nextPage: () => void;
}

export function ReviewList({ reviews, nextPage }: ReviewListProps) {
    return (
        <Box>
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
