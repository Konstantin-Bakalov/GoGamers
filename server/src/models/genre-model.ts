import { Model } from 'objection';
import { BaseModel } from './base-model';
// import { GameModel } from './game-model';

export class GenreModel extends BaseModel {
    name!: string;
    // games?: GameModel[];

    static get tableName() {
        return 'genres';
    }

    // static get relationMappings() {
    //     return {
    //         games: {
    //             relation: Model.ManyToManyRelation,
    //             modelClass: GameModel,
    //             join: {
    //                 from: 'genres.id',
    //                 through: {
    //                     from: 'game_genres.genreId',
    //                     to: 'game_genres.gameId',
    //                 },
    //                 to: 'games.id',
    //             },
    //         },
    //     };
    // }
}
