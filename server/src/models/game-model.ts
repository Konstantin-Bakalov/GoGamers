import { Model } from 'objection';
import { BaseModel } from './base-model';
import { GenreModel } from './genre-model';
import { UserModel } from './user-model';

export class GameModel extends BaseModel {
    name!: string;
    minAge!: number;
    userId!: number;
    creator?: UserModel;
    likedBy?: UserModel[];
    genres?: GenreModel[];

    static get tableName() {
        return 'games';
    }

    static get relationMappings() {
        return {
            creator: {
                relation: Model.HasOneRelation,
                modelClass: UserModel,
                join: {
                    from: 'games.userId',
                    to: 'users.id',
                },
            },
            likedBy: {
                relation: Model.ManyToManyRelation,
                modelClass: UserModel,
                join: {
                    from: 'games.id',
                    through: {
                        from: 'likes.gameId',
                        to: 'likes.userId',
                    },
                    to: 'users.id',
                },
            },
            genres: {
                relation: Model.ManyToManyRelation,
                modelClass: GenreModel,
                join: {
                    from: 'games.id',
                    through: {
                        from: 'game_genres.gameId',
                        to: 'game_genres.genreId',
                    },
                    to: 'genres.id',
                },
            },
        };
    }
}
