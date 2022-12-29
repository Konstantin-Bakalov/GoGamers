import { Button } from '@mui/material';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { MediaType } from 'shared';

export interface Media {
    type?: MediaType;
    mediaFile: File;
    source: string;
}

interface MediaUploadProps {
    onMediaSelected: (mediaFile: File, source: string) => void;
}

export function MediaUpload({ onMediaSelected }: MediaUploadProps) {
    const [selectedMedia, setSelectedMedia] = useState<File>();
    const onSelectRef = useRef(onMediaSelected);
    onSelectRef.current = onMediaSelected;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedMedia(event.target.files[0]);
        }
    };

    useEffect(() => {
        if (selectedMedia) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const source = e.target?.result as string;
                onSelectRef.current(selectedMedia, source);
            };
            reader.readAsDataURL(selectedMedia);
        }
    }, [selectedMedia]);

    return (
        <Button variant="outlined" component="label" size="large">
            Upload Image or Video
            <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,video/mp4"
                hidden
                onChange={handleChange}
            />
        </Button>
    );
}
