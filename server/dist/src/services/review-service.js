"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const review_model_1 = require("../models/review-model");
class ReviewService {
    create(review) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield review_model_1.ReviewModel.query()
                .insertAndFetch(review)
                .withGraphFetched('user');
        });
    }
    list(userId, gameId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield review_model_1.ReviewModel.query()
                .modifiers({ mod: (query) => query.where('userId', userId) })
                .where({ gameId })
                .withGraphFetched('[user, likes, dislikes, liked(mod), disliked(mod)]')
                .orderBy('createdAt', 'DESC')
                .page(page, pageSize);
        });
    }
}
exports.reviewService = new ReviewService();
