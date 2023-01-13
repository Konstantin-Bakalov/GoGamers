import { CardMedia, SxProps } from '@mui/material';

interface ImageProps {
    imageUrl: string | undefined;
    style: SxProps;
}

export function Image({ imageUrl, style }: ImageProps) {
    return (
        <CardMedia
            sx={style}
            component="img"
            image={imageUrl}
            alt="game image"
        />
    );
}
