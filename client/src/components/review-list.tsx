import { Container } from '@mui/material';
import { ReviewModelDetailed } from 'shared';
import { Review } from './review';

interface ReviewListProps {
    reviews: ReviewModelDetailed[] | undefined;
}

export function ReviewList({ reviews }: ReviewListProps) {
    return (
        <Container>
            {reviews?.map((review) => (
                <Review key={review.body} review={review} />
            ))}
        </Container>
    );
}
