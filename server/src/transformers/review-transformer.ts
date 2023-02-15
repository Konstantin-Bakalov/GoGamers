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
            profilePicture: review.user?.picture,
            liked: review.liked ? true : false,
            disliked: review.disliked ? true : false,
            likes: review.likes?.length ?? 0,
            dislikes: review.dislikes?.length ?? 0,
        };
    }

    transformArray(reviews: ReviewModel[]) {
        return reviews.map((review) => this.transform(review));
    }
}
