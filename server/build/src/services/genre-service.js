"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const genre_model_1 = require("../models/genre-model");
class GenreService {
    async all() {
        return await genre_model_1.GenreModel.query();
    }
}
exports.default = new GenreService();
