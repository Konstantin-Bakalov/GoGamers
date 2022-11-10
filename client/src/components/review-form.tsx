import { Button, Container, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';

interface ReviewsProps {
    gameId: number;
    onSubmit: (body: string, gameId: number) => void;
}

export function ReviewForm({ gameId, onSubmit }: ReviewsProps) {
    const [body, setBody] = useState('');

    const handleSubmit = (e: FormEvent<Element>) => {
        e.preventDefault();
        onSubmit(body, gameId);
        setBody('');
    };

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
                disabled={body === ''}
                disableElevation
                // loading={loading}
                onClick={(e) => handleSubmit(e)}
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
        </Container>
    );
}
