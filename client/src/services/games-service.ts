import { httpService } from './http-service';

export interface GameModel {
    id: number;
    name: string;
    userId: number;
    minAge: number;
}

class GameService {
    async loadGames(searchText?: string) {
        const result = await httpService.get<GameModel[]>('games', {
            query: { searchText },
        });

        return result;
    }

    async loadGameById(id: number) {
        return await httpService.get<GameModel>(`games/${id}`);
    }
}

export const gameService = new GameService();
