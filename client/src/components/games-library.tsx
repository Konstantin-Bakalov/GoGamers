import { useState } from 'react';
import { Game } from './game';
import { useAsync } from '../hooks/useAsync';
import { GameModel, gameService } from '../services/games-service';

export function GamesLibrary() {
    const [games, setGames] = useState<GameModel[]>([]);

    useAsync(gameService.loadGames, setGames);

    return (
        <div>
            {games.map((game, index) => (
                <Game key={index} game={game} />
            ))}
        </div>
    );
}
