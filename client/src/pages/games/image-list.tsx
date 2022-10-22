import { Box } from '@mui/material';
import { useState } from 'react';
import { MediaUpload } from '../../components/media-upload';
import { Image } from '../../components/media-upload';
import placeholder from '../images/empty-image.png';

interface ImageListProps {
    images: Image[];
    onImageAdded: (image: Image) => void;
    onImageDeleted: (index: number) => void;
}

const emptyImage: Image = {
    imageFile: new File([''], 'filename'),
    source: placeholder,
};

export function ImageList() {
    const [images, setImages] = useState<Image[]>([]);

    return (
        <>
            <MediaUpload
                onImageSelected={(imageFile, source) =>
                    setImages((prev) => [...prev, { imageFile, source }])
                }
            />
            {images.map((image, index) => (
                <Box
                    key={index}
                    sx={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                    component="img"
                    src={image.source}
                ></Box>
            ))}
        </>
    );
}
