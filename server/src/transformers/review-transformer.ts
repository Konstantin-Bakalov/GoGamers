import { ReviewModel } from '../models/review-model';
import { DislikeTransformer } from './dislike-transformer';
import { LikeTransformer } from './like-tansformer';

const likeTransformer = new LikeTransformer();
const dislikeTransformer = new DislikeTransformer();

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
            dislike: review.dislike
                ? dislikeTransformer.transform(review.dislike)
                : undefined,
        };
    }

    transformArray(reviews: ReviewModel[]) {
        return reviews.map((review) => this.transform(review));
    }
}
