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
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        borderRadius: '.5rem',
        textDecoration: 'none',
        transition: '200ms transform ease-in-out',
        '&:hover': {
            transform: 'scale(1.025)',
        },
    },
    cardTitle: {
        display: 'flex',
        justifyContent: 'flex-start',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    cardBody: {
        alignContent: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    description: {
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
});

export function GameCard({ game }: GameCardProps) {
    const image = game.media.find((image) => image.type === 'image')?.url;

    return (
        <Card component={Link} to={`/games/${game.id}`} sx={styles.card}>
            <Box>
                <Image imageUrl={image} />
            </Box>

            <Box>
                <Typography variant="h6" sx={styles.cardTitle}>
                    {game.name}
                </Typography>

                <Box sx={styles.description}>
                    <Typography>{game.description}</Typography>
                </Box>

                <Box sx={styles.cardBody}>
                    {game.genres?.map((genre, index) => (
                        <Typography key={index}>{genre.name}</Typography>
                    ))}
                </Box>
            </Box>

            {/* <Box sx={styles.priceBox}>
                {game.price ? (
                    <Typography sx={styles.price}>{game.price}€</Typography>
                ) : (
                    <Typography sx={styles.price}>Free</Typography>
                )}
            </Box> */}
        </Card>
    );
}
