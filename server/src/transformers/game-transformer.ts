import { GameModel } from '../models/game-model';

export class GameTransformer {
    transform(game: GameModel) {
        return {
            name: game.name,
            userId: game.userId,
            id: game.id,
        };
    }

    transformArray(games: GameModel[]) {
        return games.map((game) => this.transform(game));
    }
}
