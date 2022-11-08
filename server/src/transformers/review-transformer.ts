import { ReviewModel } from 'shared';

export class ReviewTransformer {
    transform(review: ReviewModel) {
        return {
            userId: review.userId,
            gameId: review.gameId,
            body: review.body,
        };
    }

    transformArray(reviews: ReviewModel[]) {
        return reviews.map((review) => this.transform(review));
    }
}
