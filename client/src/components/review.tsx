import { Avatar, Box } from '@mui/material';
import { ReviewModelDetailed } from 'shared';
import dayjs from 'dayjs';

interface ReviewProps {
    review: ReviewModelDetailed;
}

export function Review({ review }: ReviewProps) {
    return (
        <Box>
            <Avatar alt="Remy Sharp" src={review.profilePicture} />
            <Box>{review.username}</Box>
            <Box>{review.body}</Box>
            <Box>{dayjs(review.createdAt).format('D-MMM-YYYY HH:mma')}</Box>
        </Box>
    );
}
