import { BaseModel } from './base-model';

export class LikeModel extends BaseModel {
    userId!: number;
    gameId!: number;

    static get tableName() {
        return 'likes';
    }
}
