import { GameModel } from '../models/game-model';
import { DetailedGameModel } from 'shared';

export class GameTransformer {
    transform(game: GameModel): DetailedGameModel {
        return {
            id: game.id,
            userId: game.userId,
            name: game.name,
            releaseDate: game.releaseDate,
            developer: game.developer,
            freeToPlay: game.freeToPlay,
            price: Number(game.price),
            description: game.description,
            creator: game.creator,
            genres: game.genres,
            media: game.media,
        };
    }

    transformArray(games: GameModel[]): DetailedGameModel[] {
        return games.map((game) => this.transform(game));
    }
}
