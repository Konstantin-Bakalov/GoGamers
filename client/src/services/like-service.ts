import { httpService } from './http-service';

class LikeService {
    async create(reviewId: number) {
        return await httpService.post('/likes', {
            body: { reviewId },
        });
    }
}

export const likeService = new LikeService();
