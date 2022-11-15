import { ReviewModel } from '../models/review-model';

export class ReviewTransformer {
    transform(review: ReviewModel) {
        return {
            id: review.id,
            userId: review.userId,
            username: review.username,
            gameId: review.gameId,
            body: review.body,
            createdAt: review.createdAt,
            profilePicture: review.user?.profilePicture,
        };
    }

    transformArray(reviews: ReviewModel[]) {
        return reviews.map((review) => this.transform(review));
    }
}
