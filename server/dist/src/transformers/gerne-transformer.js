"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenreTransformer = void 0;
class GenreTransformer {
    transform(genre) {
        return {
            name: genre.name,
            id: genre.id,
            createdAt: genre.createdAt,
        };
    }
    transformArray(genre) {
        return genre.map((genre) => this.transform(genre));
    }
}
exports.GenreTransformer = GenreTransformer;
