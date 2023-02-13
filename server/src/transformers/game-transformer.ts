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
            price: game.price ? Number(game.price) : undefined,
            description: game.description,
            creator: game.creator,
            genres: game.genres,
            media: game.media,
            createdAt: game.createdAt,
        };
    }

    transformArray(games: GameModel[]): DetailedGameModel[] {
        return games.map((game) => this.transform(game));
    }
}
