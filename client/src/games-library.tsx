import { Game } from './game';

const games = [
    { name: 'Catan', minPlayers: 2 },
    { name: 'Catan 2', minPlayers: 3 },
    { name: 'Dixit', minPlayers: 4 },
];

export function GamesLibrary() {
    return (
        <div>
            {games.map((game, index) => (
                <Game key={index} game={game} />
            ))}
        </div>
    );
}
