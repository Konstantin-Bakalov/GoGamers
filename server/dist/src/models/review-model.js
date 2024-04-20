"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const objection_1 = require("objection");
const base_model_1 = require("./base-model");
const dislike_model_1 = require("./dislike-model");
const like_model_1 = require("./like-model");
const user_model_1 = require("./user-model");
class ReviewModel extends base_model_1.BaseModel {
    static get tableName() {
        return 'reviews';
    }
    static get relationMappings() {
        return {
            user: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: user_model_1.UserModel,
                join: {
                    from: 'reviews.userId',
                    to: 'users.id',
                },
            },
            liked: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: like_model_1.LikeModel,
                join: {
                    from: 'reviews.id',
                    to: 'likes.reviewId',
                },
            },
            disliked: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: dislike_model_1.DislikeModel,
                join: {
                    from: 'reviews.id',
                    to: 'dislikes.reviewId',
                },
            },
            likes: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: like_model_1.LikeModel,
                join: {
                    from: 'reviews.id',
                    to: 'likes.reviewId',
                },
            },
            dislikes: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: dislike_model_1.DislikeModel,
                join: {
                    from: 'reviews.id',
                    to: 'dislikes.reviewId',
                },
            },
        };
    }
}
exports.ReviewModel = ReviewModel;
