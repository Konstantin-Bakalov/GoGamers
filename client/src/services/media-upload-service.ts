import { MediaType } from 'shared';
import { isVideo } from '../pages/games/media-list';
import { httpService } from './http-service';

class MediaUploadService {
    private reader = new FileReader();

    public async upload(media: File) {
        const converted = await this.getBase64(media);
        const type: MediaType = isVideo(media) ? 'video' : 'image';

        const { url } = await httpService.post<{ url: string }>('/media', {
            body: { media: converted, type },
        });

        return { url, type };
    }

    private async getBase64(media: File) {
        return new Promise((res, rej) => {
            this.reader.readAsDataURL(media);
            this.reader.onload = () => res(this.reader.result);

            this.reader.onerror = () => rej(this.reader.error);
        });
    }
}

export const mediaUploadService = new MediaUploadService();
