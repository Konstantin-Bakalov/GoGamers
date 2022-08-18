export interface GameModel {
    name: string;
    minPlayers: number;
    id: number;
}

const dbGames = [
    { name: 'Catan', minPlayers: 2, id: 1 },
    { name: 'Catan 2', minPlayers: 3, id: 2 },
    { name: 'Dixit', minPlayers: 4, id: 3 },
];

class GameService {
    loadGames(): Promise<GameModel[]> {
        return new Promise((res, rej) => {
            setTimeout(() => res(dbGames), 1000);
        });
    }

    loadGame(id: number): Promise<GameModel | undefined> {
        return new Promise((res, rej) => {
            setTimeout(() => res(dbGames.find((game) => game.id === id)), 1000);
        });
    }
}

export const gameService = new GameService();
