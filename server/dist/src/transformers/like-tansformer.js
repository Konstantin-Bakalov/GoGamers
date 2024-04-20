"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeTransformer = void 0;
class LikeTransformer {
    transform(like) {
        return {
            id: like.id,
            reviewId: like.reviewId,
        };
    }
    transformArray(genre) {
        return genre.map((like) => this.transform(like));
    }
}
exports.LikeTransformer = LikeTransformer;
