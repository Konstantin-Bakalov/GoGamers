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
            {media.map((med) =>
                med.type === 'image' ? (
                    <Image imageUrl={med.url} />
                ) : (
                    <Video videoUrl={med.url} />
                ),
            )}
        </Box>
    );
}
