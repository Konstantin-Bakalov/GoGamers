import { BaseModel } from './base-model';

export class LikeModel extends BaseModel {
    userId!: number;
    reviewId!: number;

    static get tableName() {
        return 'likes';
    }
}
