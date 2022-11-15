import { Model } from 'objection';
import { BaseModel } from './base-model';
import { UserModel } from './user-model';

export class ReviewModel extends BaseModel {
    userId!: number;
    username!: string;
    gameId!: number;
    body!: string;
    user?: UserModel;

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
        };
    }
}
