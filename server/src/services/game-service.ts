import { Model } from 'objection';
import { GameGenreModel } from '../models/game-genre-model';
import { GameModel } from '../models/game-model';
import { GenreModel } from '../models/genre-model';
import { LikeModel } from '../models/like-model';
import { GameModelRequest } from 'shared';
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

    async addLike(userId: number, gameId: number) {
        return await LikeModel.query().insertAndFetch({
            userId,
            gameId,
        });
    }

    async listGames({
        page,
        pageSize,
        searchText,
    }: {
        page: number;
        pageSize: number;
        searchText?: string;
    }) {
        let result = GameModel.query()
            .orderBy(['name', 'id'])
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

    async createGameWithLikes(name: string, userId: number, minAge: number) {
        // return await GameModel.transaction(async (trx) => {
        //     const game = await GameModel.query(trx).insertAndFetch({
        //         name,
        //         userId,
        //         minAge,
        //     });
        //     await LikeModel.query(trx).insert({
        //         userId,
        //         gameId: game.id,
        //     });
        //     return game;
        // });
    }

    async findGameById(id: number) {
        return await GameModel.query()
            .findById(id)
            .throwIfNotFound()
            .withGraphFetched('[genres, media]');
    }

    async getGamesWithLikes() {
        return await GameModel.query().withGraphFetched('likedBy');
    }

    async getGamesWithCreatorAndLikes() {
        return await GameModel.query()
            .modifiers({
                usersWithoutPasswords: (query) =>
                    query.select('id', 'name', 'age'),
            })
            .withGraphFetched('[creator(usersWithoutPasswords), likedBy]');
    }
}

export default new GameService();
