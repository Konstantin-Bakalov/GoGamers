import { Box, Card, SxProps, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { DetailedGameModel } from 'shared';
import { makeStyles } from '../../lib/make-styles';
import { Image } from '../image';

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
        '&:hover': {
            '.MuiCardMedia-root': {
                transform: 'scale(1.025)',
            },
        },
    },
    cardTitle: {
        display: 'flex',
        justifyContent: 'flex-start',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    cardContent: {
        padding: '.5rem 1rem',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
    },
    genresContainer: {
        alignContent: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap-reverse',
        justifyContent: 'flex-start',
        gap: '.5rem',
    },
    genres: {
        padding: '.2rem .5rem',
        borderRadius: '1rem',
    },
    description: {
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    descriptionText: {
        fontSize: '15px',
    },
});

const imageStyle: SxProps = {
    width: '100%',
    aspectRatio: '16 / 9',
    objectFit: 'cover',
    maxHeight: '200px',
    objectPosition: 'center',
    transition: '400ms transform ease-in-out',
};

export function GameCard({ game }: GameCardProps) {
    const image = game.media.find((image) => image.type === 'image')?.url;
    const theme = useTheme();

    return (
        <Card
            elevation={8}
            component={Link}
            to={`/games/${game.id}`}
            sx={styles.card}
        >
            <Image imageUrl={image} style={imageStyle} />

            <Box sx={styles.cardContent}>
                <Box>
                    <Typography variant="h6" sx={styles.cardTitle}>
                        {game.name}
                    </Typography>

                    <Box sx={styles.description}>
                        <Typography sx={styles.descriptionText}>
                            {game.description}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={styles.genresContainer}>
                    {game.genres?.map((genre, index) => (
                        <Box
                            bgcolor={theme.palette.primary.main}
                            sx={styles.genres}
                            key={index}
                        >
                            <Typography
                                color="background.paper"
                                variant="subtitle2"
                                fontWeight={700}
                            >
                                {genre.name.toLowerCase()}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Card>
    );
}
