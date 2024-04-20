"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const review_model_1 = require("../models/review-model");
class ReviewService {
    async create(review) {
        return await review_model_1.ReviewModel.query()
            .insertAndFetch(review)
            .withGraphFetched('user');
    }
    async list(userId, gameId, page, pageSize) {
        return await review_model_1.ReviewModel.query()
            .modifiers({ mod: (query) => query.where('userId', userId) })
            .where({ gameId })
            .withGraphFetched('[user, likes, dislikes, liked(mod), disliked(mod)]')
            .orderBy('createdAt', 'DESC')
            .page(page, pageSize);
    }
}
exports.reviewService = new ReviewService();
