import { CardMedia, SxProps } from '@mui/material';

interface VideoProps {
    videoUrl: string | undefined;
    style: SxProps;
}

export function Video({ videoUrl, style }: VideoProps) {
    return (
        <CardMedia component="video" src={videoUrl} sx={style} controls muted />
    );
}
