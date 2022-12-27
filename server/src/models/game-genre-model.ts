import { BaseModel } from './base-model';

export class GameGenreModel extends BaseModel {
    gameId!: number;
    genreId!: number;

    static get tableName() {
        return 'game_genres';
    }
}
