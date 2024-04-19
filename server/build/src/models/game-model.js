"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModel = void 0;
const objection_1 = require("objection");
const base_model_1 = require("./base-model");
const genre_model_1 = require("./genre-model");
const media_model_1 = require("./media-model");
const user_model_1 = require("./user-model");
class GameModel extends base_model_1.BaseModel {
    static get tableName() {
        return 'games';
    }
    static get relationMappings() {
        return {
            creator: {
                relation: objection_1.Model.HasOneRelation,
                modelClass: user_model_1.UserModel,
                join: {
                    from: 'games.userId',
                    to: 'users.id',
                },
            },
            genres: {
                relation: objection_1.Model.ManyToManyRelation,
                modelClass: genre_model_1.GenreModel,
                join: {
                    from: 'games.id',
                    through: {
                        from: 'game_genres.gameId',
                        to: 'game_genres.genreId',
                    },
                    to: 'genres.id',
                },
            },
            media: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: media_model_1.MediaModel,
                join: {
                    from: 'games.id',
                    to: 'media.gameId',
                },
            },
        };
    }
}
exports.GameModel = GameModel;
