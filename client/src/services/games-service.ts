import { DedailedGameModel, GameModelRequest } from 'shared';
import { httpService } from './http-service';

class GameService {
    async create(game: GameModelRequest) {
        return await httpService.post<DedailedGameModel>('/games', {
            body: game,
        });
    }

    async loadGames(page: string, searchText?: string) {
        return await httpService.get<DedailedGameModel[]>('/games', {
            query: { searchText, page },
        });
    }

    async loadGameById(id: number) {
        return await httpService.get<DedailedGameModel>(`/games/${id}`);
    }
}

export const gameService = new GameService();
