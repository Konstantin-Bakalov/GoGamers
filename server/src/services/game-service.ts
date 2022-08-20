import { GameModel } from '../models/game-model';
import { LikeModel } from '../models/like-model';

class GameService {
    async addGame(name: string, userId: number, minAge: number) {
        return await GameModel.query().insertAndFetch({
            name,
            userId,
            minAge,
        });
    }

    async addLike(userId: number, gameId: number) {
        return await LikeModel.query().insertAndFetch({
            userId,
            gameId,
        });
    }

    async listGames(page: number, pageSize: number) {
        return await GameModel.query()
            .orderBy(['name', 'id'])
            .page(page, pageSize);
    }

    async createGameWithLikes(name: string, userId: number, minAge: number) {
        return await GameModel.transaction(async (trx) => {
            const game = await GameModel.query(trx).insertAndFetch({
                name,
                userId,
                minAge,
            });

            const like = await LikeModel.query(trx).insert({
                userId,
                gameId: game.id,
            });

            return game;
        });
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
