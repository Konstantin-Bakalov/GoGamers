import { CardMedia } from '@mui/material';
import { makeStyles } from '../lib/make-styles';

interface ImageProps {
    imageUrl: string | undefined;
}

const styles = makeStyles({
    image: {
        display: 'block',
        width: '100%',
        aspectRatio: '16 / 9',
        objectFit: 'cover',
        maxHeight: '200px',
        objectPosition: 'center',
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
