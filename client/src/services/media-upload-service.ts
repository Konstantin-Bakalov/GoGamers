import { MediaType } from 'shared';
import { isVideo } from '../pages/games/media-list';
import { httpService } from './http-service';

class MediaUploadService {
  public async upload(media: File) {
    const converted = await this.getBase64(media);
    const type: MediaType = isVideo(media) ? 'video' : 'image';

    const { url } = await httpService.post<{ url: string }>('/media', {
      body: { media: converted, type },
    });

    return { url, type };
  }

  private async getBase64(media: File) {
    const reader = new FileReader();
    return new Promise((res, rej) => {
      reader.readAsDataURL(media);
      reader.onload = () => res(reader.result);

      reader.onerror = () => rej(reader.error);
    });
  }
}

export const mediaUploadService = new MediaUploadService();
