import { DetailedGameModel, GameModelRequest } from 'shared';
import { FilterState } from '../pages/home-page';
import { httpService } from './http-service';

interface LoadGames {
    results: DetailedGameModel[];
    total: number;
}

class GameService {
    async create(game: GameModelRequest) {
        return await httpService.post<DetailedGameModel>('/games', {
            body: game,
        });
    }

    async list(state: FilterState) {
        return await httpService.get<LoadGames>('/games', {
            query: { ...state },
        });
    }

    async loadGameById(id: number) {
        return await httpService.get<DetailedGameModel>(`/games/${id}`);
    }

    async deleteById(id: number) {
        return await httpService.delete(`/games/${id}`);
    }
}

export const gameService = new GameService();
