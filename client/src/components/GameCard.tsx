import { Box, Typography } from '@mui/material';
import { DedailedGameModel } from 'shared';

interface GameCardProps {
    game: DedailedGameModel;
}

export function GameCard({ game }: GameCardProps) {
    return (
        <Box>
            <Typography>{game.name}</Typography>
            <Typography>Genres:</Typography>
            {game.genres?.map((genre, index) => (
                <Typography key={index}>{genre.name}</Typography>
            ))}
            <Typography>Images:</Typography>
            {game.media?.map((media, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '150px',
                        height: '100px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                    component="img"
                    placeholder={'image'}
                    src={media.url}
                ></Box>
            ))}
        </Box>
    );
}
