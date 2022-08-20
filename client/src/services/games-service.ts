import { authService } from './auth-service';

export interface GameModel {
    id: number;
    name: string;
    userId: number;
    minAge: number;
}

class GameService {
    async loadGames() {
        const response = await fetch('http://localhost:3001/games', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${authService.token}`,
            },
        });

        const result = await response.json();

        return result;
    }

    // loadGame(id: number): Promise<GameModel | undefined> {
    //     return new Promise((res, rej) => {
    //         setTimeout(() => res(dbGames.find((game) => game.id === id)), 1000);
    //     });
    // }
}

export const gameService = new GameService();
