import { Box, Typography } from '@mui/material';
import { DetailedGameModel } from 'shared';

type GameDescriptionProps = Pick<DetailedGameModel, 'description'>;

export function GameDescription({ description }: GameDescriptionProps) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Typography
                sx={{ alignSelf: 'center' }}
                variant="h3"
                fontWeight={700}
            >
                About this game
            </Typography>
            <Typography variant="h5">{description}</Typography>
        </Box>
    );
}
