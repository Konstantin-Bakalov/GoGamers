"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameTransformer = void 0;
class GameTransformer {
    transform(game) {
        return {
            id: game.id,
            userId: game.userId,
            name: game.name,
            releaseDate: game.releaseDate,
            developer: game.developer,
            freeToPlay: game.freeToPlay,
            price: game.price ? Number(game.price) : undefined,
            description: game.description,
            creator: game.creator,
            genres: game.genres,
            media: game.media,
            createdAt: game.createdAt,
        };
    }
    transformArray(games) {
        return games.map((game) => this.transform(game));
    }
}
exports.GameTransformer = GameTransformer;
