import { LikeModel } from '../models/like-model';

export class LikeTransformer {
    transform(like: LikeModel) {
        return {
            id: like.id,
            reviewId: like.reviewId,
        };
    }

    transformArray(genre: LikeModel[]) {
        return genre.map((like) => this.transform(like));
    }
}
