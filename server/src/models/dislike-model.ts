import { BaseModel } from './base-model';

export class DislikeModel extends BaseModel {
    userId!: number;
    reviewId!: number;

    static get tableName() {
        return 'dislikes';
    }
}
