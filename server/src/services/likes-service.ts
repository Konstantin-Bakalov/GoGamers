import { LikeModel } from '../models/like-model';

class LikesService {
    async create(userId: number, reviewId: number) {
        return await LikeModel.query().insertAndFetch({
            userId,
            reviewId,
        });
    }

    async delete(reviewId: number) {
        return await LikeModel.query().deleteById(reviewId);
    }
}

export const likesService = new LikesService();
