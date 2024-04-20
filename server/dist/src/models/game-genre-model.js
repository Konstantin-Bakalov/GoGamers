"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGenreModel = void 0;
const base_model_1 = require("./base-model");
class GameGenreModel extends base_model_1.BaseModel {
    static get tableName() {
        return 'game_genres';
    }
}
exports.GameGenreModel = GameGenreModel;
