import { DislikeModel } from '../models/dislike-model';

export class DislikeTransformer {
    transform(dislike: DislikeModel) {
        return {
            id: dislike.id,
            reviewId: dislike.reviewId,
        };
    }

    transformArray(genre: DislikeModel[]) {
        return genre.map((like) => this.transform(like));
    }
}
