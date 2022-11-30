import { DislikeModel } from '../models/dislike-model';

class DislikesService {
    async create(userId: number, reviewId: number) {
        return await DislikeModel.query().insertAndFetch({
            userId,
            reviewId,
        });
    }

    async list(reviewId: number) {
        return await DislikeModel.query().where({ reviewId });
    }

    async delete(userId: number, reviewId: number) {
        return await DislikeModel.query().where({ userId, reviewId }).delete();
    }
}

export const dislikesService = new DislikesService();
