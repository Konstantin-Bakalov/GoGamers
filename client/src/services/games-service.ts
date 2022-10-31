import { DedailedGameModel, GameModelRequest } from 'shared';
import { FilterState } from '../pages/home-page';
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

    async list(state: FilterState) {
        return await httpService.get<LoadGames>('/games', {
            query: { ...state },
        });
    }

    async loadGameById(id: number) {
        return await httpService.get<DedailedGameModel>(`/games/${id}`);
    }
}

export const gameService = new GameService();
