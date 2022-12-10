import { Box } from '@mui/material';
import { MediaModel } from 'shared';
import { Image } from './image';
import { Video } from './video';

interface GameMediaProps {
    media: MediaModel[];
}

export function GameMedia({ media }: GameMediaProps) {
    return (
        <Box>
            {media.map((med, index) =>
                med.type === 'image' ? (
                    <Image key={index} imageUrl={med.url} />
                ) : (
                    <Video key={index} videoUrl={med.url} />
                ),
            )}
        </Box>
    );
}
