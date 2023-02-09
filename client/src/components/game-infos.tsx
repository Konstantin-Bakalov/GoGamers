import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
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
        <Box sx={{ maxWidth: '400px', flexGrow: 1 }}>
            <Typography>{`Developer: ${developer}`}</Typography>
            <Typography>{`Release Date: ${dayjs(releaseDate).format(
                'D MMM YYYY',
            )}`}</Typography>
            <Typography>{`${freeToPlay ? 'free' : price}`}</Typography>
            {/* <Typography variant="h5">{description}</Typography> */}
        </Box>
    );
}
