import { httpService } from './http-service';

class DislikeService {
    async create(reviewId: number) {
        return await httpService.post('/dislikes', {
            body: { reviewId },
        });
    }

    async delete(reviewId: number) {
        return await httpService.delete(`/dislikes/${reviewId}`);
    }

    // async list(reviewId: number) {
    //     return await httpService.get(`/likes/${reviewId}`);
    // }
}

export const dislikeService = new DislikeService();
