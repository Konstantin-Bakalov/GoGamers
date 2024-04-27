import { Alert, Box } from '@mui/material';
import { useState } from 'react';
import { Media } from '../components/media-upload';
import placeholderImage from '../images/empty-image.png';
import { useAsyncAction } from './use-async-action';
import { mediaUploadService } from '../services/media-upload-service';
import { MediaList } from '../pages/games/media-list';
import { maxMediaCount } from 'shared';

const emptyMedia: Media = {
  mediaFile: new File([''], 'empty file'),
  source: placeholderImage,
};

const emptyMediaArray: Media[] = new Array(maxMediaCount).fill(emptyMedia);

export function useMediaForm() {
  const [media, setMedia] = useState<Media[]>(emptyMediaArray);

  const [mediaError, setMediaError] = useState<Error>();

  const { perform } = useAsyncAction(async () => {
    const uploadedMedia = await Promise.all(
      media.filter((med) => med.source !== placeholderImage).map((med) => mediaUploadService.upload(med.mediaFile))
    );

    return uploadedMedia;
  });

  let valid = true;

  const validateMedia = () => {
    return media.filter((med) => med.source !== placeholderImage).length > 0;
  };

  const validate = () => {
    if (!validateMedia()) {
      valid = false;
      setMediaError(new Error('You must upload at least one image'));
    } else {
      setMediaError(undefined);
    }

    return valid;
  };

  const onMediaAdded = (med: Media) => {
    setMedia((prev) => {
      const mediaFiltered = [...prev, med].filter((m) => m.source !== emptyMedia.source);

      if (mediaFiltered.length >= maxMediaCount) {
        return mediaFiltered.slice(0, maxMediaCount);
      }

      const emptyMed = new Array(emptyMediaArray.length - mediaFiltered.length).fill(emptyMedia);

      return [...mediaFiltered, ...emptyMed];
    });
  };

  const onMediaDeleted = (index: number) => {
    setMedia([
      ...media.filter((_, ind) => index !== ind),
      {
        ...emptyMedia,
      },
    ]);
  };

  return {
    perform,
    validate,
    render: (
      <Box>
        <MediaList media={media} onMediaAdded={onMediaAdded} onMediaDeleted={onMediaDeleted} />
        {mediaError && <Alert severity="error">{mediaError.message}</Alert>}
      </Box>
    ),
  };
}
