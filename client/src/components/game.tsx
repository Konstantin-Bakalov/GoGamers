import { DetailedGameModel } from 'shared';

interface GameProps {
    game: DetailedGameModel;
}

export function Game({ game }: GameProps) {
    return <div>{game.name}</div>;
}
