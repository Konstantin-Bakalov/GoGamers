import { httpService } from './http-service';

class LikeService {
    async create(reviewId: number) {
        return await httpService.post('/likes', {
            body: { reviewId },
        });
    }

    async delete(reviewId: number) {
        return await httpService.delete(`/likes/${reviewId}`);
    }

    // async list(reviewId: number) {
    //     return await httpService.get(`/likes/${reviewId}`);
    // }
}

export const likeService = new LikeService();
