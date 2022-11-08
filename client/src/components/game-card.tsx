import { Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DetailedGameModel } from 'shared';

interface GameCardProps {
    game: DetailedGameModel;
}

export function GameCard({ game }: GameCardProps) {
    const image = game.media.find((image) => image.type === 'image')?.url;

    return (
        <Card
            sx={{ maxWidth: '200px' }}
            component={Link}
            to={`/games/${game.id}`}
            elevation={3}
        >
            <CardActionArea>
                <CardMedia
                    height="200"
                    component="img"
                    alt="game image"
                    image={image}
                />
                <Typography>{game.name}</Typography>
                <Typography>{game.creator?.name}</Typography>
                <Typography>Genres:</Typography>
                {game.genres?.map((genre, index) => (
                    <Typography key={index}>{genre.name}</Typography>
                ))}
            </CardActionArea>
        </Card>
    );
}
