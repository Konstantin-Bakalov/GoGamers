import { Model } from 'objection';
import { GameGenreModel } from '../models/game-genre-model';
import { GameModel } from '../models/game-model';
import { GenreModel } from '../models/genre-model';
import { ForbiddenError, GameModelRequest, UpdateGameModel } from 'shared';
import { MediaModel } from '../models/media-model';

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
            .orderBy(`${order[0]}`, order[1] === 'DESC' ? 'DESC' : 'ASC')
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

    async update(game: UpdateGameModel, userId: number) {
        if (game.userId === userId) {
            return await GameModel.query().upsertGraph(game);
        }
        throw new ForbiddenError('You have no permission to update this game');
    }
}

export default new GameService();
