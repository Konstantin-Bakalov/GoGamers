import { CardMedia, SxProps } from '@mui/material';

interface VideoProps {
    videoUrl: string | undefined;
    style?: SxProps;
    controls: boolean;
    autoPlay?: boolean;
}

export function Video({ videoUrl, style, controls, autoPlay }: VideoProps) {
    return (
        <CardMedia
            component="video"
            src={videoUrl}
            sx={style}
            controls={controls}
            muted
            autoPlay={autoPlay}
        />
    );
}
