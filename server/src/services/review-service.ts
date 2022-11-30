import { ReviewModel } from '../models/review-model';
import { ReviewModel as RWM } from 'shared';

class ReviewService {
    async create(review: RWM) {
        return await ReviewModel.query().insertAndFetch(review);
    }

    async list(userId: number, gameId: number, page: number, pageSize: number) {
        return await ReviewModel.query()
            .modifiers({ mod: (query) => query.where('userId', userId) })
            .where({ gameId })
            .withGraphFetched(
                '[user, likes, dislikes, liked(mod), disliked(mod)]',
            )
            .orderBy('createdAt', 'DESC');
    }
}

export const reviewService = new ReviewService();
