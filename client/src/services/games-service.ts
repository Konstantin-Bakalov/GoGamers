import { DedailedGameModel, GameModelRequest } from 'shared';
import { httpService } from './http-service';

interface LoadGames {
    results: DedailedGameModel[];
    total: number;
}

class GameService {
    async create(game: GameModelRequest) {
        return await httpService.post<DedailedGameModel>('/games', {
            body: game,
        });
    }

    async list(page: string, maxItems: string, searchText?: string) {
        return await httpService.get<LoadGames>('/games', {
            query: { page, maxItems, searchText },
        });
    }

    async loadGameById(id: number) {
        return await httpService.get<DedailedGameModel>(`/games/${id}`);
    }
}

export const gameService = new GameService();
