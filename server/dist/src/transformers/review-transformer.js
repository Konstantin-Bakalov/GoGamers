"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewTransformer = void 0;
class ReviewTransformer {
    transform(review) {
        var _a, _b, _c, _d, _e;
        return {
            id: review.id,
            userId: review.userId,
            username: review.username,
            gameId: review.gameId,
            body: review.body,
            createdAt: review.createdAt,
            profilePicture: (_a = review.user) === null || _a === void 0 ? void 0 : _a.picture,
            liked: review.liked ? true : false,
            disliked: review.disliked ? true : false,
            likes: (_c = (_b = review.likes) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0,
            dislikes: (_e = (_d = review.dislikes) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0,
        };
    }
    transformArray(reviews) {
        return reviews.map((review) => this.transform(review));
    }
}
exports.ReviewTransformer = ReviewTransformer;
