import { ReviewModel } from '../models/review-model';

export class ReviewTransformer {
    transform(review: ReviewModel) {
        return {
            userId: review.userId,
            username: review.username,
            gameId: review.gameId,
            body: review.body,
            createdAt: review.createdAt,
        };
    }

    transformArray(reviews: ReviewModel[]) {
        return reviews.map((review) => this.transform(review));
    }
}
