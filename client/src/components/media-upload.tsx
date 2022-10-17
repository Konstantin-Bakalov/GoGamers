import { Button } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export interface Image {
    imageFile: File;
    source: string;
}

interface MediaUploadProps {
    onImageSelected: (image: File, source: string) => void;
}

export function MediaUpload({ onImageSelected }: MediaUploadProps) {
    const [selectedImage, setSelectedImage] = useState<File>();
    const onSelectRef = useRef(onImageSelected);
    onSelectRef.current = onImageSelected;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedImage(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (selectedImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const source = e.target?.result as string;
                onSelectRef.current(selectedImage, source);
            };
            reader.readAsDataURL(selectedImage);
        }
    }, [selectedImage]);

    return (
        <Button variant="outlined" component="label" size="large">
            Upload Image
            <input
                type="file"
                name="img"
                accept="image/png,image/jpeg/image/jpg"
                hidden
                onChange={handleChange}
            />
        </Button>
    );
}
