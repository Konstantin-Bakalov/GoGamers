import { ReviewModel } from '../models/review-model';
import { LikeTransformer } from './like-tansformer';

const likeTransformer = new LikeTransformer();

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
            like: review.like
                ? likeTransformer.transform(review.like)
                : undefined,
        };
    }

    transformArray(reviews: ReviewModel[]) {
        return reviews.map((review) => this.transform(review));
    }
}
