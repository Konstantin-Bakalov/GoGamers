import { httpService } from './http-service';

export interface GameModel {
    id: number;
    name: string;
    userId: number;
    minAge: number;
}

class GameService {
    async loadGames() {
        const result = await httpService.get<GameModel[]>('games');

        return result;
    }
}

export const gameService = new GameService();
