import { Alert, Box, Button } from '@mui/material';
import { useState } from 'react';
import { Image } from '../../components/media-upload';
import { ImageList } from './image-list';
import placeholderImage from '../../images/empty-image.png';
import { useAsyncAction } from '../../hooks/use-async-action';
import { mediaUploadService } from '../../services/media-upload-service';
import { MediaRequestModel } from 'shared';
import { LoadingButton } from '@mui/lab';
import { maxMediaCount } from 'shared';

interface ImageFormProps {
    onSubmit: (media: MediaRequestModel[]) => void;
    onClose: () => void;
}

const emptyImage: Image = {
    imageFile: new File([''], 'filename'),
    source: placeholderImage,
};

const emptyImages: Image[] = new Array(maxMediaCount).fill(emptyImage);

export function ImageForm({ onSubmit, onClose }: ImageFormProps) {
    const [images, setImages] = useState<Image[]>(emptyImages);
    const [imagesError, setImagesError] = useState<Error>();

    const { trigger, loading } = useAsyncAction(async () => {
        const media = (
            await Promise.all(
                images
                    .filter((img) => img.source !== placeholderImage)
                    .map((img) => mediaUploadService.upload(img.imageFile)),
            )
        ).map<MediaRequestModel>((url) => {
            return { type: 'image', url };
        });

        onSubmit(media);
    });

    let valid = true;

    const validateImages = () => {
        return (
            images.filter((img) => img.source !== placeholderImage).length > 0
        );
    };

    const validate = () => {
        if (!validateImages()) {
            valid = false;
            setImagesError(new Error('You must upload at least one image'));
        } else {
            setImagesError(undefined);
        }

        return valid;
    };

    return (
        <Box>
            <Box>
                <ImageList
                    images={images}
                    onImageAdded={(image) => {
                        setImages((prev) => {
                            const imgs = [...prev, image].filter(
                                (img) => img.source !== emptyImage.source,
                            );

                            if (imgs.length >= maxMediaCount) {
                                return imgs.slice(0, maxMediaCount);
                            }

                            const emptyImgs = new Array(
                                emptyImages.length - imgs.length,
                            ).fill(emptyImage);

                            return [...imgs, ...emptyImgs];
                        });
                    }}
                    onImageDeleted={(index) => {
                        setImages([
                            ...images.filter((_, ind) => index !== ind),
                            {
                                imageFile: new File([''], 'filename'),
                                source: placeholderImage,
                            },
                        ]);
                    }}
                />
                {imagesError && (
                    <Alert severity="error">{imagesError.message}</Alert>
                )}
            </Box>
            <Box>
                <Button variant="outlined" size="large" onClick={onClose}>
                    Cancel
                </Button>
                <LoadingButton
                    loading={loading}
                    variant="contained"
                    type="submit"
                    size="large"
                    onClick={() => {
                        if (validate()) {
                            trigger();
                        }
                    }}
                >
                    Add Images
                </LoadingButton>
            </Box>
        </Box>
    );
}
