import { Box, IconButton, Tooltip } from '@mui/material';
import { MediaUpload } from '../../components/media-upload';
import { Media } from '../../components/media-upload';
import { makeStyles } from '../../lib/make-styles';
import placeholderImage from '../../images/empty-image.png';
import ClearIcon from '@mui/icons-material/Clear';
import { Video } from '../../components/video';
import { Image } from '../../components/image';
import { EditMedia } from '../../hooks/use-media-edit-form';
import InfoIcon from '@mui/icons-material/Info';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useState } from 'react';
import { VideoDialog } from '../../dialogs/video-dialog';

const tooltipMessage = 'Image format .png .jpg .jpeg Video format .mp4';

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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: {
            xs: 'center',
            sm: 'space-between',
            md: 'space-between',
            lg: 'space-between',
            xl: 'space-between',
        },
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: '20px',
        gap: '20px',
    },
    iconButton: {
        color: '#FF1744',
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
    media: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '.5rem',
    },
    playVideo: {
        transform: 'scale(1.7)',
        padding: 0,
        position: 'absolute',
        top: '50%',
        left: '50%',
        bottom: '50%',
        right: '50%',
        '&:hover': {
            color: 'primary.main',
        },
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
    const [open, setOpen] = useState(false);
    const [mediaIndex, setMediaIndex] = useState(-1);

    const openDialog = (index: number) => {
        setMediaIndex(index);
        setOpen(true);
    };

    return (
        <Box>
            <Box sx={styles.box}>
                <MediaUpload
                    onMediaSelected={(mediaFile, source) =>
                        onMediaAdded({ mediaFile, source })
                    }
                />

                <Tooltip title={tooltipMessage}>
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            <Box sx={styles.list}>
                {media.map((media, index) => (
                    <Box key={index} sx={styles.listItem}>
                        {isVideo(media.mediaFile) || editMediaIsVideo(media) ? (
                            <Box>
                                <Video
                                    style={styles.media}
                                    videoUrl={media.source}
                                    controls={false}
                                />
                                <IconButton
                                    sx={styles.playVideo}
                                    onClick={() => openDialog(index)}
                                >
                                    <PlayCircleIcon />
                                </IconButton>
                            </Box>
                        ) : (
                            <Image
                                style={styles.media}
                                imageUrl={media.source}
                            />
                        )}

                        {media.source !== placeholderImage && (
                            <IconButton
                                disableRipple={true}
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

            {open && (
                <VideoDialog
                    videoUrl={media[mediaIndex].source}
                    onClose={() => setOpen(false)}
                />
            )}
        </Box>
    );
}
