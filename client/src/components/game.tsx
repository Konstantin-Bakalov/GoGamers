import { GameModel } from '../services/games-service';

interface GameProps {
    game: GameModel;
}

export function Game({ game }: GameProps) {
    return (
        <p>
            Game: {game.name} for min of {game.minAge} players
        </p>
    );
}
