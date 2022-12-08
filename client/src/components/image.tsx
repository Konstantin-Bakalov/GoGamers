import { Box } from '@mui/material';
import { makeStyles } from '../lib/make-styles';

interface ImageProps {
    imageUrl: string | undefined;
}

const styles = makeStyles({
    image: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        objectPosition: 'center',
    },
});

export function Image({ imageUrl }: ImageProps) {
    return (
        <Box
            component="img"
            placeholder="image"
            src={imageUrl}
            sx={styles.image}
        />
    );
}
