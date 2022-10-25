import { DedailedGameModel } from 'shared';

export function Game(game: DedailedGameModel) {
    return <p>Game: {game.name}</p>;
}
