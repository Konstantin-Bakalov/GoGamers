import { Model } from 'objection';
import { BaseModel } from './base-model';
import { DislikeModel } from './dislike-model';
import { LikeModel } from './like-model';
import { UserModel } from './user-model';

export class ReviewModel extends BaseModel {
    userId!: number;
    username!: string;
    gameId!: number;
    body!: string;
    user?: UserModel;
    liked?: LikeModel;
    disliked?: DislikeModel;
    likes?: LikeModel[];
    dislikes?: DislikeModel[];

    static get tableName() {
        return 'reviews';
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'reviews.userId',
                    to: 'users.id',
                },
            },
            liked: {
                relation: Model.BelongsToOneRelation,
                modelClass: LikeModel,
                join: {
                    from: 'reviews.id',
                    to: 'likes.reviewId',
                },
            },
            disliked: {
                relation: Model.BelongsToOneRelation,
                modelClass: DislikeModel,
                join: {
                    from: 'reviews.id',
                    to: 'dislikes.reviewId',
                },
            },
            likes: {
                relation: Model.HasManyRelation,
                modelClass: LikeModel,
                join: {
                    from: 'reviews.id',
                    to: 'likes.reviewId',
                },
            },
            dislikes: {
                relation: Model.HasManyRelation,
                modelClass: DislikeModel,
                join: {
                    from: 'reviews.id',
                    to: 'dislikes.reviewId',
                },
            },
        };
    }
}
