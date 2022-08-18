import { useState } from 'react';
import { Game } from './game';
import { useAsync } from './hooks/useAsync';
import { GameModel, loadGames } from './load-games';

export function GamesLibrary() {
    const [games, setGames] = useState<GameModel[]>([]);

    useAsync(loadGames, setGames);

    return (
        <div>
            {games.map((game, index) => (
                <Game key={index} game={game} />
            ))}
        </div>
    );
}
