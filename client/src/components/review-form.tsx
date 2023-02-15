import { Box, Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { makeStyles } from '../lib/make-styles';

interface ReviewsProps {
    gameId: number;
    loading: boolean;
    onSubmit: (body: string, gameId: number) => void;
}

const styles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 1.5,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2,
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2,
            },
        },
    },
});

export function ReviewForm({ gameId, loading, onSubmit }: ReviewsProps) {
    const [body, setBody] = useState('');

    const handleSubmit = (e: FormEvent<Element>) => {
        e.preventDefault();
        onSubmit(body, gameId);
        setBody('');
    };

    return (
        <Box sx={styles.container}>
            <TextField
                sx={styles.textField}
                value={body}
                label="Write a review"
                size="small"
                multiline
                minRows={2}
                onChange={(e) => setBody(e.target.value)}
            />

            <Box sx={{ alignSelf: 'flex-end', display: 'flex', gap: '1rem' }}>
                <Button
                    variant="outlined"
                    disableElevation
                    onClick={() => setBody('')}
                >
                    Cancel
                </Button>

                <LoadingButton
                    variant="contained"
                    disabled={body === ''}
                    disableElevation
                    loading={loading}
                    onClick={(e) => handleSubmit(e)}
                >
                    Submit review
                </LoadingButton>
            </Box>
        </Box>
    );
}
