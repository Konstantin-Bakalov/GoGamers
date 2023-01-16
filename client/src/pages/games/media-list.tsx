import { Box, IconButton } from '@mui/material';
import { MediaUpload } from '../../components/media-upload';
import { Media } from '../../components/media-upload';
import { makeStyles } from '../../lib/make-styles';
import placeholderImage from '../../images/empty-image.png';
import ClearIcon from '@mui/icons-material/Clear';
import { Video } from '../../components/video';
import { Image } from '../../components/image';
import { EditMedia } from '../../hooks/use-media-edit-form';

interface MediaListProps {
    media: (Media | EditMedia)[];
    onMediaAdded: (image: Media) => void;
    onMediaDeleted: (index: number) => void;
}

const styles = makeStyles({
    box: {
        display: 'flex',
        justifyContent: 'center',
    },
    list: {
        // display: 'flex',
        // justifyContent: 'space-between',
        // flexWrap: 'wrap',
        // marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '1rem',
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

export function isEditMedia(media: Media | EditMedia): media is EditMedia {
    return 'type' in media;
}

function editMediaIsVideo(media: Media | EditMedia) {
    if (isEditMedia(media) && media.type === 'video') {
        return true;
    }

    return false;
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
                        {isVideo(media.mediaFile) || editMediaIsVideo(media) ? (
                            <Video
                                style={{
                                    width: '300px',
                                    height: '200px',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                                videoUrl={media.source}
                            />
                        ) : (
                            // TODO: Add style to Image
                            <Image
                                style={{ height: '200px' }}
                                imageUrl={media.source}
                            />
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
