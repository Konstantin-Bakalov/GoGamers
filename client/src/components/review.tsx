import { Box } from '@mui/material';
import { ReviewModelDetailed } from 'shared';

interface ReviewProps {
    review: ReviewModelDetailed;
}

export function Review({ review }: ReviewProps) {
    return (
        <Box>
            <Box>
                {review.body}, {review.username}
            </Box>
        </Box>
    );
}
