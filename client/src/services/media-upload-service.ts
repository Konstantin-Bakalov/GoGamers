import { isVideo } from '../pages/games/media-list';
import { httpService } from './http-service';

class MediaUploadService {
    async upload(media: File) {
        const { url } = await httpService.get<{ url: string }>('/s3');

        await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: media,
        });

        const type: 'image' | 'video' = isVideo(media) ? 'video' : 'image';

        return { url: url.split('?')[0], type };
    }
}

export const mediaUploadService = new MediaUploadService();
