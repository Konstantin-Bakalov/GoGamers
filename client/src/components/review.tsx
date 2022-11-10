import { Box } from '@mui/material';
import { ReviewModelDetailed } from 'shared';
import { format, parseJSON } from 'date-fns';

interface ReviewProps {
    review: ReviewModelDetailed;
}

export function Review({ review }: ReviewProps) {
    console.log(typeof review.createdAt);
    return (
        <Box>
            <Box>
                {review.body}, {review.username}
            </Box>
            <Box>{format(new Date(2014, 1, 11), 'MM/dd/yyyy')}</Box>
            {/* <Box>{review.createdAt.getFullYear()}</Box> */}
            {/* <Box>{}</Box> */}
        </Box>
    );
}
