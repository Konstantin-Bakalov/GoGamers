"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreModel = void 0;
const base_model_1 = require("./base-model");
class GenreModel extends base_model_1.BaseModel {
    static get tableName() {
        return 'genres';
    }
}
exports.GenreModel = GenreModel;
