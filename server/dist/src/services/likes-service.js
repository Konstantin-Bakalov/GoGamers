"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likesService = void 0;
const like_model_1 = require("../models/like-model");
class LikesService {
    async create(userId, reviewId) {
        return await like_model_1.LikeModel.query().insertAndFetch({
            userId,
            reviewId,
        });
    }
    async list(reviewId) {
        return await like_model_1.LikeModel.query().where({ reviewId });
    }
    async delete(userId, reviewId) {
        return await like_model_1.LikeModel.query().where({ userId, reviewId }).delete();
    }
}
exports.likesService = new LikesService();
