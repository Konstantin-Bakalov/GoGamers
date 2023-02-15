import { BaseModel } from './base-model';

export class GenreModel extends BaseModel {
    name!: string;

    static get tableName() {
        return 'genres';
    }
}
