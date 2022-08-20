import { GameModel } from '../models/game-model';

export class GameTransformer {
    transform(game: GameModel) {
        return {
            name: game.name,
            userId: game.userId,
            minAge: game.minAge,
            id: game.id,
        };
    }

    transformArray(games: GameModel[]) {
        return games.map((game) => this.transform(game));
    }
}

export default new GameTransformer();
