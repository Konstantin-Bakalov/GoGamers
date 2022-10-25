import { DedailedGameModel, GameModelRequest } from 'shared';
import { httpService } from './http-service';

class GameService {
    async create(game: GameModelRequest) {
        return await httpService.post<DedailedGameModel>('/games', {
            body: game,
        });
    }

    async loadGames(searchText?: string) {
        // const result = await httpService.get<GameModel[]>('games', {
        //     query: { searchText },
        // });
        // return result;
    }

    async loadGameById(id: number) {
        return await httpService.get<DedailedGameModel>(`games/${id}`);
    }
}

export const gameService = new GameService();
