import { Box, Typography } from '@mui/material';
import { DetailedGameModel } from 'shared';

export function GameInfos({
    description,
    developer,
    releaseDate,
    freeToPlay,
    price,
}: Pick<
    DetailedGameModel,
    | 'description'
    | 'developer'
    | 'genres'
    | 'releaseDate'
    | 'freeToPlay'
    | 'price'
>) {
    return (
        <Box>
            <Typography variant="h5">{description}</Typography>
            <Typography>{`Developer: ${developer}`}</Typography>
            <Typography>{releaseDate.toString()}</Typography>
            <Typography>{freeToPlay ? 'free' : price}</Typography>
        </Box>
    );
}
