import { httpService } from './http-service';

export interface GameModel {
    id: number;
    name: string;
    userId: number;
    minAge: number;
}

interface CreateGameInput {
    name: string;
    minAge: number;
    genres: string[];
    url: string;
    type: 'image' | 'video';
}

class GameService {
    async create(input: CreateGameInput) {
        return await httpService.post<GameModel>('/games', {
            body: input,
        });
    }

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
