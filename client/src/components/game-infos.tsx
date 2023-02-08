import { Box, Typography } from '@mui/material';
import { BaseGameModel } from 'shared';

export function GameInfos({
    description,
    developer,
    releaseDate,
    freeToPlay,
    price,
}: Pick<
    BaseGameModel,
    'description' | 'developer' | 'releaseDate' | 'freeToPlay' | 'price'
>) {
    return (
        <Box>
            <Typography>{description}</Typography>
            <Typography>{developer}</Typography>
            <Typography>{releaseDate.toString()}</Typography>
            <Typography>{freeToPlay ? 'free' : price}</Typography>
        </Box>
    );
}
