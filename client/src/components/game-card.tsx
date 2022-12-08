import { Card, CardActionArea, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DetailedGameModel } from 'shared';
import { Video } from './video';
import { Image } from './image';

interface GameCardProps {
    game: DetailedGameModel;
}

export function GameCard({ game }: GameCardProps) {
    const image = game.media.find((image) => image.type === 'image')?.url;
    const video = game.media.find((video) => video.type === 'video')?.url;

    return (
        <Card
            sx={{ maxWidth: '200px' }}
            component={Link}
            to={`/games/${game.id}`}
            elevation={3}
        >
            <CardActionArea>
                {image ? (
                    <Image imageUrl={image} />
                ) : (
                    <Video videoUrl={video} />
                )}
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
