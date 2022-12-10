import { Box, IconButton } from '@mui/material';
import { MediaUpload } from '../../components/media-upload';
import { Media } from '../../components/media-upload';
import { makeStyles } from '../../lib/make-styles';
import placeholderImage from '../../images/empty-image.png';
import ClearIcon from '@mui/icons-material/Clear';
import { Video } from '../../components/video';
import { Image } from '../../components/image';

interface MediaListProps {
    media: Media[];
    onMediaAdded: (image: Media) => void;
    onMediaDeleted: (index: number) => void;
}

const styles = makeStyles({
    box: {
        display: 'flex',
        justifyContent: 'center',
    },
    list: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: '20px',
    },
    iconButton: {
        color: 'red',
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 0,
    },
    listItem: {
        '.deleteButton': { display: 'none' },
        '&:hover .deleteButton': { display: 'block' },
        position: 'relative',
    },
});

const acceptedImageFormats = ['png', 'jpg', 'jpeg'];
const acceptedVideoFormats = ['mp4'];

export function isImage(mediaFile: File) {
    const imageType = mediaFile.type.split('/')[1];
    return acceptedImageFormats.includes(imageType);
}

export function isVideo(mediaFile: File) {
    const videoType = mediaFile.type.split('/')[1];
    return acceptedVideoFormats.includes(videoType);
}

export function MediaList({
    media,
    onMediaAdded,
    onMediaDeleted,
}: MediaListProps) {
    return (
        <Box>
            <Box sx={styles.box}>
                <MediaUpload
                    onMediaSelected={(mediaFile, source) =>
                        onMediaAdded({ mediaFile, source })
                    }
                />
            </Box>
            <Box sx={styles.list}>
                {media.map((media, index) => (
                    <Box key={index} sx={styles.listItem}>
                        {isVideo(media.mediaFile) ? (
                            <Video videoUrl={media.source} />
                        ) : (
                            <Image imageUrl={media.source} />
                        )}

                        {media.source !== placeholderImage && (
                            <IconButton
                                sx={styles.iconButton}
                                className="deleteButton"
                                onClick={() => onMediaDeleted(index)}
                            >
                                <ClearIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
