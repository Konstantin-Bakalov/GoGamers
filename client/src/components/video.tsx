import { CardMedia, SxProps } from '@mui/material';

interface VideoProps {
    videoUrl: string | undefined;
    style?: SxProps;
    controls: boolean;
}

export function Video({ videoUrl, style, controls }: VideoProps) {
    return (
        <CardMedia
            component="video"
            src={videoUrl}
            sx={style}
            controls={controls}
            muted
        />
    );
}
