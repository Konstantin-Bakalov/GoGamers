import { useEffect, useState } from 'react';
import { Game } from './game';
import { GameModel, loadGames } from './load-games';

export function GamesLibrary() {
    const [games, setGames] = useState<GameModel[]>([]);

    useEffect(() => {
        loadGames().then((games) => setGames(games));
    }, []);

    return (
        <div>
            {games.map((game, index) => (
                <Game key={index} game={game} />
            ))}
        </div>
    );
}
