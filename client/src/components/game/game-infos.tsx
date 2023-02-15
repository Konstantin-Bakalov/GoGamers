import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { DetailedGameModel } from 'shared';
import { makeStyles } from '../../lib/make-styles';

const styles = makeStyles({
    container: {
        maxWidth: '450px',
        flexGrow: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        rowGap: '.5rem',
    },
    line: {
        display: 'flex',
        gap: '1rem',
    },
    genres: {
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '.5rem',
    },
});

type GameInfosProps = Pick<
    DetailedGameModel,
    | 'developer'
    | 'genres'
    | 'releaseDate'
    | 'freeToPlay'
    | 'price'
    | 'creator'
    | 'createdAt'
>;

export function GameInfos({
    developer,
    genres,
    releaseDate,
    freeToPlay,
    price,
    creator,
    createdAt,
}: GameInfosProps) {
    return (
        <Box sx={styles.container}>
            <Typography variant="h5" fontWeight={700}>
                Developer
            </Typography>

            <Typography variant="h5">{developer}</Typography>

            <Typography noWrap variant="h5" fontWeight={700}>
                Release date
            </Typography>

            <Typography variant="h5">
                {dayjs(releaseDate).format('D MMM YYYY')}
            </Typography>

            <Typography variant="h5" fontWeight={700}>
                Price
            </Typography>

            <Typography variant="h5">
                {freeToPlay ? 'Free to play' : `${price} $`}
            </Typography>

            <Typography variant="h5" fontWeight={700}>
                Added by
            </Typography>

            <Typography variant="h5">{creator.name}</Typography>

            <Typography variant="h5" fontWeight={700}>
                Added on
            </Typography>

            <Typography variant="h5">
                {dayjs(createdAt).format('D MMM YYYY')}
            </Typography>

            <Typography variant="h5" fontWeight={700}>
                Genres
            </Typography>

            <Box sx={styles.genres}>
                {genres.map((genre, index) => (
                    <Typography key={genre.name} variant="h5">
                        {`${genre.name.toLowerCase()}${
                            index === genres.length - 1 ? '' : ','
                        }`}
                    </Typography>
                ))}
            </Box>
        </Box>
    );
}
