import { Box, IconButton } from '@mui/material';
import { MediaUpload } from '../../components/media-upload';
import { Image } from '../../components/media-upload';
import { makeStyles } from '../../lib/make-styles';
import placeholderImage from '../../images/empty-image.png';
import ClearIcon from '@mui/icons-material/Clear';

interface ImageListProps {
    images: Image[];
    onImageAdded: (image: Image) => void;
    onImageDeleted: (index: number) => void;
}

const styles = makeStyles({
    box: {
        display: 'flex',
        justifyContent: 'center',
    },
    image: {
        width: '90px',
        height: '90px',
        objectFit: 'cover',
        objectPosition: 'center',
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

export function ImageList({
    images,
    onImageAdded,
    onImageDeleted,
}: ImageListProps) {
    return (
        <Box>
            <Box sx={styles.box}>
                <MediaUpload
                    onImageSelected={(image, source) =>
                        onImageAdded({ imageFile: image, source })
                    }
                />
            </Box>
            <Box sx={styles.list}>
                {images.map((image, index) => (
                    <Box key={index} sx={styles.listItem}>
                        <Box
                            component="img"
                            placeholder="image"
                            src={image.source}
                            sx={styles.image}
                        />
                        {image.source !== placeholderImage && (
                            <IconButton
                                sx={styles.iconButton}
                                className="deleteButton"
                                onClick={() => onImageDeleted(index)}
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
