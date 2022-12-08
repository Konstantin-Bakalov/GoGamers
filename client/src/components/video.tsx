import { CardMedia } from '@mui/material';
import { makeStyles } from '../lib/make-styles';
import { Media } from './media-upload';

interface VideoProps {
    video: Media;
}

const styles = makeStyles({
    video: {
        width: '300px',
        height: '200px',
        objectFit: 'cover',
        objectPosition: 'center',
    },
});

export function Video({ video }: VideoProps) {
    return (
        <>
            <CardMedia
                component="video"
                src={video.source}
                sx={styles.video}
                controls
            ></CardMedia>
        </>
    );
}
