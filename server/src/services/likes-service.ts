import { LikeModel } from '../models/like-model';

class LikesService {
    async create(userId: number, reviewId: number) {
        return await LikeModel.query().insertAndFetch({
            userId,
            reviewId,
        });
    }

    async list(reviewId: number) {
        return await LikeModel.query().where({ reviewId });
    }

    async delete(userId: number, reviewId: number) {
        return await LikeModel.query().where({ userId, reviewId }).delete();
    }
}

export const likesService = new LikesService();
