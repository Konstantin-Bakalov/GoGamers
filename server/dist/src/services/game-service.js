"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const game_genre_model_1 = require("../models/game-genre-model");
const game_model_1 = require("../models/game-model");
const genre_model_1 = require("../models/genre-model");
const shared_1 = require("shared");
const media_model_1 = require("../models/media-model");
function isMediaModel(media) {
    return media.id !== undefined;
}
class GameService {
    async create(input) {
        return await objection_1.Model.transaction(async (trx) => {
            const game = await game_model_1.GameModel.query(trx).insertAndFetch({
                name: input.name,
                userId: input.userId,
                releaseDate: input.releaseDate,
                developer: input.developer,
                freeToPlay: input.freeToPlay,
                price: input.price,
                description: input.description,
            });
            const genres = [];
            for (const genreName of input.genres) {
                const genre = await genre_model_1.GenreModel.query(trx)
                    .insert(genreName)
                    .onConflict('name')
                    .merge();
                genres.push(genre);
            }
            const gameGenres = genres.map((genre) => {
                return { gameId: game.id, genreId: genre.id };
            });
            await game_genre_model_1.GameGenreModel.query(trx).insert(gameGenres);
            for (const media of input.media) {
                await media_model_1.MediaModel.query(trx).insert({
                    gameId: game.id,
                    type: media.type,
                    url: media.url,
                });
            }
            return game;
        });
    }
    async listGames({ page, pageSize, searchText, orderBy, }) {
        const order = orderBy.split(' ');
        let result = game_model_1.GameModel.query()
            .withGraphFetched('[genres, media, creator]')
            .orderByRaw(`${order[0]} ${order[1] === 'DESC' ? 'DESC' : 'ASC'} NULLS LAST`)
            .page(page, pageSize);
        if (result && searchText) {
            result = result.where('name', 'ilike', `%${searchText.replace('%', '')}%`);
        }
        return await result;
    }
    async findGameById(id) {
        return await game_model_1.GameModel.query()
            .findById(id)
            .throwIfNotFound()
            .withGraphFetched('[genres, media, creator]');
    }
    async deleteById(id, userId) {
        const game = await game_model_1.GameModel.query().findById(id).throwIfNotFound();
        if ((game === null || game === void 0 ? void 0 : game.userId) === userId) {
            return await game_model_1.GameModel.query().deleteById(id);
        }
        else {
            throw new shared_1.ForbiddenError('You have no permission to delete this content');
        }
    }
    // transactions in objection.js prevents us
    // from splitting this in a few helper methods
    async update(game, userId) {
        if (game.userId === userId) {
            return await objection_1.Model.transaction(async (trx) => {
                await game_genre_model_1.GameGenreModel.query(trx)
                    .where({
                    gameId: game.id,
                })
                    .delete();
                const genres = [];
                for (const genreName of game.genres) {
                    const genre = await genre_model_1.GenreModel.query(trx)
                        .insert(genreName)
                        .onConflict('name')
                        .merge();
                    genres.push(genre);
                }
                const gameGenres = genres.map((genre) => {
                    return { gameId: game.id, genreId: genre.id };
                });
                await game_genre_model_1.GameGenreModel.query(trx).insert(gameGenres);
                const idsToKeep = [];
                game.media.forEach((med) => {
                    if (isMediaModel(med)) {
                        idsToKeep.push(med.id);
                    }
                });
                const media = await media_model_1.MediaModel.query(trx).where({
                    gameId: game.id,
                });
                await Promise.all(media
                    .filter((med) => {
                    if (!idsToKeep.includes(med.id)) {
                        return true;
                    }
                    return false;
                })
                    .map((med) => media_model_1.MediaModel.query(trx).deleteById(med.id)));
                const newMedia = game.media.filter((med) => {
                    if (isMediaModel(med)) {
                        return false;
                    }
                    return true;
                });
                await Promise.all(newMedia.map((med) => media_model_1.MediaModel.query(trx).insert({
                    gameId: game.id,
                    url: med.url,
                    type: med.type,
                })));
                return await game_model_1.GameModel.query(trx)
                    .findById(game.id)
                    .patchAndFetchById(game.id, {
                    name: game.name,
                    releaseDate: game.releaseDate,
                    developer: game.developer,
                    freeToPlay: game.freeToPlay,
                    price: game.price,
                    description: game.description,
                });
            });
        }
        throw new shared_1.ForbiddenError('You have no permission to update this game');
    }
}
exports.default = new GameService();
