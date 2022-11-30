import { Avatar, Box, IconButton } from '@mui/material';
import { ReviewModelDetailed } from 'shared';
import dayjs from 'dayjs';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useAsyncAction } from '../hooks/use-async-action';
import { likeService } from '../services/like-service';
import { useState } from 'react';
import { dislikeService } from '../services/dislike-service';

interface ReviewProps {
    review: ReviewModelDetailed;
}

export function Review({ review }: ReviewProps) {
    const [liked, setLiked] = useState(review.like ? true : false);
    const [disliked, setDisliked] = useState(review.dislike ? true : false);

    const { trigger: like } = useAsyncAction(async () => {
        if (!liked) {
            if (disliked) {
                await dislikeService.delete(review.id);
                setDisliked(false);
            }
            await likeService.create(review.id);
            setLiked(true);
        } else {
            await likeService.delete(review.id);
            setLiked(false);
        }
    });

    const { trigger: dislike } = useAsyncAction(async () => {
        if (!disliked) {
            if (liked) {
                await likeService.delete(review.id);
                setLiked(false);
            }
            await dislikeService.create(review.id);
            setDisliked(true);
        } else {
            await dislikeService.delete(review.id);
            setDisliked(false);
        }
    });

    return (
        <Box>
            <Avatar alt="User" src={review.profilePicture} />
            <Box>{review.username}</Box>
            <Box>{review.body}</Box>
            <Box>{dayjs(review.createdAt).format('D-MMM-YYYY HH:mma')}</Box>
            <IconButton onClick={like}>
                {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
            </IconButton>
            <IconButton onClick={dislike}>
                {disliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
            </IconButton>
        </Box>
    );
}
