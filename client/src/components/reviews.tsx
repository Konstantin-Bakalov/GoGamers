import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { makeStyles } from '../lib/make-styles';
import { ReviewForm, ReviewFormProps } from './review-form';
import { ReviewList, ReviewListProps } from './review-list';

interface ReviewsProps extends ReviewFormProps, ReviewListProps {
    scrollLoading: boolean;
}

const styles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    scroll: {
        alignSelf: 'center',
    },
});

export function Reviews({
    reviews,
    nextPage,
    gameId,
    onSubmit,
    loading,
    scrollLoading,
}: ReviewsProps) {
    return (
        <Box sx={styles.container}>
            <Typography variant="h3" fontWeight={700}>
                Reviews
            </Typography>

            <Divider variant="fullWidth" color="secondary" />

            <ReviewForm gameId={gameId} loading={loading} onSubmit={onSubmit} />

            <ReviewList reviews={reviews} nextPage={nextPage} />

            {scrollLoading && <CircularProgress sx={styles.scroll} />}
        </Box>
    );
}
