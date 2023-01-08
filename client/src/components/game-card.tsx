import { Box, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { DetailedGameModel } from 'shared';
import { makeStyles } from '../lib/make-styles';
import { Image } from './image';

interface GameCardProps {
    game: DetailedGameModel;
}

const styles = makeStyles({
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        borderRadius: '.5rem',
        elevation: '8',
        textDecoration: 'none',
        transition: '200ms transform ease-in-out',
        '&:hover': {
            transform: 'scale(1.025)',
        },
    },
    cardTitle: {
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'center',
        textDecoration: 'none',
    },
    cardBody: {
        alignContent: 'flex-start',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
});

export function GameCard({ game }: GameCardProps) {
    const image = game.media.find((image) => image.type === 'image')?.url;

    return (
        <Card component={Link} to={`/games/${game.id}`} sx={styles.card}>
            <Box>
                <Image imageUrl={image} />
                <Typography variant="h6" sx={styles.cardTitle}>
                    {game.name}
                </Typography>
            </Box>

            <Box sx={styles.cardBody}>
                {game.genres?.map((genre, index) => (
                    <Typography key={index}>{genre.name}</Typography>
                ))}

                {game.price ? (
                    <Typography>{game.price}€</Typography>
                ) : (
                    <Typography>Free</Typography>
                )}
            </Box>
        </Card>
    );
}
