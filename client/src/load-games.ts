export interface GameModel {
    name: string;
    minPlayers: number;
}

const dbGames = [
    { name: 'Catan', minPlayers: 2 },
    { name: 'Catan 2', minPlayers: 3 },
    { name: 'Dixit', minPlayers: 4 },
];

export function loadGames(): Promise<GameModel[]> {
    return new Promise((res, rej) => {
        setTimeout(() => res(dbGames), 1000);
    });
}
