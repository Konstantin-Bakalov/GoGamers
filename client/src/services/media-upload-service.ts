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

        return url.split('?')[0];
    }
}

export const mediaUploadService = new MediaUploadService();
