import { Box, Divider, Typography } from '@mui/material';
import { DetailedGameModel } from 'shared';
import { makeStyles } from '../../lib/make-styles';

type GameDescriptionProps = Pick<DetailedGameModel, 'description'>;

const styles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    title: {
        alignSelf: 'start',
    },
    description: {
        whiteSpace: 'pre-line',
    },
});

export function GameDescription({ description }: GameDescriptionProps) {
    return (
        <Box sx={styles.container}>
            <Typography sx={styles.title} variant="h3" fontWeight={700}>
                About this game
            </Typography>
            <Divider variant="fullWidth" color="main" />
            <Typography sx={styles.description} variant="h5">
                {description}
            </Typography>
        </Box>
    );
}
