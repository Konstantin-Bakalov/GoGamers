import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { GameModel, gameService } from '../services/games-service';

export function GamePage() {
    const [game, setGame] = useState<GameModel>();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useAsync(async () => {
        setLoading(true);

        return gameService
            .loadGame(Number(id))
            .finally(() => setLoading(false));
    }, setGame);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!game) {
        return <p>No such game</p>;
    }

    return (
        <p>
            Game: {game?.name} id: {game?.id}
        </p>
    );
}
