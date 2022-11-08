import { Box, Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { useAsyncAction } from '../hooks/use-async-action';
import { reviewService } from '../services/reviews-service';
import { LoadingButton } from '@mui/lab';
import { ReviewList } from './review-list';
import { useAsync } from '../hooks/use-async';

interface ReviewsProps {
    gameId: number;
}

export function Reviews({ gameId }: ReviewsProps) {
    const [body, setBody] = useState('');

    const disableButton = () => body === '';

    const {
        trigger: submit,
        loading,
        error,
    } = useAsyncAction(async () => {
        await reviewService.create({ body, gameId });
    });

    const { data } = useAsync(async () => {
        return await reviewService.listAll(gameId);
    }, [body]);

    console.log(data);

    return (
        <Container disableGutters>
            <TextField
                value={body}
                label="Write a review"
                size="small"
                multiline
                minRows={2}
                onChange={(e) => setBody(e.target.value)}
            ></TextField>

            <LoadingButton
                variant="contained"
                disabled={disableButton()}
                disableElevation
                loading={loading}
                onClick={submit}
            >
                Submit review
            </LoadingButton>

            <Button
                variant="contained"
                disableElevation
                onClick={() => setBody('')}
            >
                Cancel
            </Button>

            {data?.map((review, index) => (
                <Box key={index}>{review.body}</Box>
            ))}

            {/* <ReviewList gameId={gameId} /> */}
        </Container>
    );
}
