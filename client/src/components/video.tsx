import { Box, CardMedia } from '@mui/material';
import { makeStyles } from '../lib/make-styles';

interface VideoProps {
    videoUrl: string | undefined;
}

const styles = makeStyles({
    video: {
        width: '300px',
        height: '200px',
        objectFit: 'cover',
        objectPosition: 'center',
    },
});

export function Video({ videoUrl }: VideoProps) {
    return (
        <Box>
            <CardMedia
                component="video"
                src={videoUrl}
                sx={styles.video}
                controls
                muted
            ></CardMedia>
        </Box>
    );
}
