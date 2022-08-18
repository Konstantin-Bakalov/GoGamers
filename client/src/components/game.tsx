interface GameProps {
    game: {
        name: string;
        minPlayers: number;
    };
}

export function Game({ game }: GameProps) {
    return (
        <p>
            Game: {game.name} for min of {game.minPlayers} players
        </p>
    );
}
