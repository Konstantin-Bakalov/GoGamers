import { Card, CardActionArea, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DetailedGameModel } from 'shared';
import { makeStyles } from '../lib/make-styles';
import { Image } from './image';

interface GameCardProps {
    game: DetailedGameModel;
}

export function GameCard({ game }: GameCardProps) {
    const image = game.media.find((image) => image.type === 'image')?.url;

    return (
        <Card
            component={Link}
            to={`/games/${game.id}`}
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Typography>{game.name}</Typography>
            <CardActionArea>
                <Image imageUrl={image} />

                {game.genres?.map((genre, index) => (
                    <Typography key={index}>{genre.name}</Typography>
                ))}
            </CardActionArea>
        </Card>
    );
}
