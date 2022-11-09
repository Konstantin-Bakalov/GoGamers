import { BaseModel } from './base-model';

export class ReviewModel extends BaseModel {
    userId!: number;
    username!: string;
    gameId!: number;
    body!: string;

    static get tableName() {
        return 'reviews';
    }
}
