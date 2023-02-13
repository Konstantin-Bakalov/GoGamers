import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { PropsWithChildren } from 'react';
import { DetailedGameModel } from 'shared';

export function GameInfos({
    developer,
    releaseDate,
    freeToPlay,
    price,
    children,
}: PropsWithChildren<
    Pick<
        DetailedGameModel,
        | 'description'
        | 'developer'
        | 'genres'
        | 'releaseDate'
        | 'freeToPlay'
        | 'price'
    >
>) {
    return (
        <Box sx={{ maxWidth: '400px', flexGrow: 1 }}>
            {children}
            <Typography>{`Developer: ${developer}`}</Typography>
            <Typography>{`Release date: ${dayjs(releaseDate).format(
                'D MMM YYYY',
            )}`}</Typography>
            {freeToPlay ? (
                <Typography>Free to play</Typography>
            ) : (
                <Typography>{`Price: ${price}`}</Typography>
            )}
        </Box>
    );
}
