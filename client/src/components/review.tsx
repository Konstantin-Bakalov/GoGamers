import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { ReviewModelDetailed } from 'shared';
import dayjs from 'dayjs';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useAsyncAction } from '../hooks/use-async-action';
import { likeService } from '../services/like-service';
import { useEffect, useRef, useState } from 'react';
import { dislikeService } from '../services/dislike-service';
import { useObserver } from '../hooks/use-observer';

interface ReviewProps {
    review: ReviewModelDetailed;
    isLast: boolean;
    nextPage: () => void;
}

const options = {
    root: null,
    rootMargin: '100px',
    threshhold: 0.5,
};

export function Review({ review, isLast, nextPage }: ReviewProps) {
    const ref = useRef();
    const entry = useObserver(ref, options);

    useEffect(() => {
        if (!entry) return;

        if (isLast && entry.isIntersecting) {
            nextPage();
        }
    }, [entry]);

    const [liked, setLiked] = useState(review.liked);
    const [disliked, setDisliked] = useState(review.disliked);

    const [likeCount, setLikeCount] = useState(review.likes);
    const [dislikeCount, setDislikeCount] = useState(review.dislikes);

    const { trigger: like } = useAsyncAction(async () => {
        if (!liked) {
            if (disliked) {
                await dislikeService.delete(review.id);
                setDisliked(false);
                setDislikeCount((prev) => prev - 1);
            }
            await likeService.create(review.id);
            setLiked(true);
            setLikeCount((prev) => prev + 1);
        } else {
            await likeService.delete(review.id);
            setLiked(false);
            setLikeCount((prev) => prev - 1);
        }
    });

    const { trigger: dislike } = useAsyncAction(async () => {
        if (!disliked) {
            if (liked) {
                await likeService.delete(review.id);
                setLiked(false);
                setLikeCount((prev) => prev - 1);
            }
            await dislikeService.create(review.id);
            setDisliked(true);
            setDislikeCount((prev) => prev + 1);
        } else {
            await dislikeService.delete(review.id);
            setDisliked(false);
            setDislikeCount((prev) => prev - 1);
        }
    });

    return (
        <Box ref={ref}>
            <Avatar alt="User" src={review.profilePicture} />
            <Box>{review.username}</Box>
            <Box>{review.body}</Box>
            <Box>{dayjs(review.createdAt).format('D MMM YYYY HH:mma')}</Box>
            <IconButton onClick={like}>
                {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                <Typography>{likeCount}</Typography>
            </IconButton>
            <IconButton onClick={dislike}>
                {disliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
                <Typography>{dislikeCount}</Typography>
            </IconButton>
        </Box>
    );
}
