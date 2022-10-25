import { DedailedGameModel, GameModelRequest } from 'shared';
import { httpService } from './http-service';

class GameService {
    async create(game: GameModelRequest) {
        return await httpService.post<DedailedGameModel>('/games', {
            body: game,
        });
    }

    async loadGames(searchText?: string) {
        return await httpService.get<DedailedGameModel[]>('/games', {
            query: { searchText },
        });
    }

    async loadGameById(id: number) {
        return await httpService.get<DedailedGameModel>(`/games/${id}`);
    }
}

export const gameService = new GameService();
