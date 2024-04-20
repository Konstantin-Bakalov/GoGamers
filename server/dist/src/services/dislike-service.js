"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dislikesService = void 0;
const dislike_model_1 = require("../models/dislike-model");
class DislikesService {
    async create(userId, reviewId) {
        return await dislike_model_1.DislikeModel.query().insertAndFetch({
            userId,
            reviewId,
        });
    }
    async list(reviewId) {
        return await dislike_model_1.DislikeModel.query().where({ reviewId });
    }
    async delete(userId, reviewId) {
        return await dislike_model_1.DislikeModel.query().where({ userId, reviewId }).delete();
    }
}
exports.dislikesService = new DislikesService();
