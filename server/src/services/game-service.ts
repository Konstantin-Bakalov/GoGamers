import { Model } from 'objection';
import { GameGenreModel } from '../models/game-genre-model';
import { GameModel } from '../models/game-model';
import { GenreModel } from '../models/genre-model';
import {
    ForbiddenError,
    GameModelRequest,
    MediaRequestModel,
    UpdateGameModel,
} from 'shared';
import { MediaModel } from '../models/media-model';

function isMediaModel(
    media: MediaModel | MediaRequestModel,
): media is MediaModel {
    return (media as MediaModel).id !== undefined;
}

class GameService {
    async create(input: GameModelRequest) {
        return await Model.transaction(async (trx) => {
            const game = await GameModel.query(trx).insertAndFetch({
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
                const genre = await GenreModel.query(trx)
                    .insert(genreName)
                    .onConflict('name')
                    .merge();

                genres.push(genre);
            }

            const gameGenres = genres.map((genre) => {
                return { gameId: game.id, genreId: genre.id };
            });

            await GameGenreModel.query(trx).insert(gameGenres);

            for (const media of input.media) {
                await MediaModel.query(trx).insert({
                    gameId: game.id,
                    type: media.type,
                    url: media.url,
                });
            }

            return game;
        });
    }

    async listGames({
        page,
        pageSize,
        searchText,
        orderBy,
    }: {
        page: number;
        pageSize: number;
        searchText?: string;
        orderBy: string;
    }) {
        const order = orderBy.split(' ');

        let result = GameModel.query()
            .withGraphFetched('[genres, media, creator]')
            .orderByRaw(
                `${order[0]} ${
                    order[1] === 'DESC' ? 'DESC' : 'ASC'
                } NULLS LAST`,
            )
            .page(page, pageSize);

        if (result && searchText) {
            result = result.where(
                'name',
                'ilike',
                `%${searchText.replace('%', '')}%`,
            );
        }

        return await result;
    }

    async findGameById(id: number) {
        return await GameModel.query()
            .findById(id)
            .throwIfNotFound()
            .withGraphFetched('[genres, media, creator]');
    }

    async deleteById(id: number, userId: number) {
        const game = await GameModel.query().findById(id).throwIfNotFound();

        if (game?.userId === userId) {
            return await GameModel.query().deleteById(id);
        } else {
            throw new ForbiddenError(
                'You have no permission to delete this content',
            );
        }
    }

    // transactions in objection.js prevents us
    // from splitting this in a few helper methods
    async update(game: UpdateGameModel, userId: number) {
        if (game.userId === userId) {
            return await Model.transaction(async (trx) => {
                await GameGenreModel.query(trx)
                    .where({
                        gameId: game.id,
                    })
                    .delete();

                const genres = [];

                for (const genreName of game.genres) {
                    const genre = await GenreModel.query(trx)
                        .insert(genreName)
                        .onConflict('name')
                        .merge();

                    genres.push(genre);
                }

                const gameGenres = genres.map((genre) => {
                    return { gameId: game.id, genreId: genre.id };
                });

                await GameGenreModel.query(trx).insert(gameGenres);

                const idsToKeep: number[] = [];

                game.media.forEach((med) => {
                    if (isMediaModel(med)) {
                        idsToKeep.push(med.id);
                    }
                });

                const media = await MediaModel.query(trx).where({
                    gameId: game.id,
                });

                await Promise.all(
                    media
                        .filter((med) => {
                            if (!idsToKeep.includes(med.id)) {
                                return true;
                            }

                            return false;
                        })
                        .map((med) => MediaModel.query(trx).deleteById(med.id)),
                );

                const newMedia: MediaRequestModel[] = game.media.filter(
                    (med) => {
                        if (isMediaModel(med)) {
                            return false;
                        }

                        return true;
                    },
                );

                await Promise.all(
                    newMedia.map((med) =>
                        MediaModel.query(trx).insert({
                            gameId: game.id,
                            url: med.url,
                            type: med.type,
                        }),
                    ),
                );

                return await GameModel.query(trx)
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
        throw new ForbiddenError('You have no permission to update this game');
    }
}

export default new GameService();
