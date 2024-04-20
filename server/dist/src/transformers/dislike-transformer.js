"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DislikeTransformer = void 0;
class DislikeTransformer {
    transform(dislike) {
        return {
            id: dislike.id,
            reviewId: dislike.reviewId,
        };
    }
    transformArray(genre) {
        return genre.map((like) => this.transform(like));
    }
}
exports.DislikeTransformer = DislikeTransformer;
