import { CardMedia } from '@mui/material';
import { makeStyles } from '../lib/make-styles';

interface ImageProps {
    imageUrl: string | undefined;
}

const styles = makeStyles({
    image: {
        width: '100%',
        height: '12rem',
        objectFit: 'cover',
        objectPosition: 'center',
        display: 'flex',
        aspectRatio: '3/2',
    },
});

export function Image({ imageUrl }: ImageProps) {
    return (
        <CardMedia
            sx={styles.image}
            component="img"
            image={imageUrl}
            alt="game image"
        />
    );
}
