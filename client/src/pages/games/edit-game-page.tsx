import { Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GameModelRequest, User } from 'shared';
import { useAsync } from '../../hooks/use-async';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useCurrentUser } from '../../hooks/use-current-user';
import { gameService } from '../../services/games-service';
import { GameInfoForm } from './game-info-form';

export function EditGamePage() {
    const user = useCurrentUser() as User;

    const [game, setGame] = useState<GameModelRequest>({
        name: '',
        userId: user.id,
        releaseDate: new Date(),
        developer: '',
        freeToPlay: false,
        price: undefined,
        description: '',
        genres: [],
        media: [],
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useAsync(async () => {
        const result = await gameService.loadGameById(Number(id));
        setGame(result);
    }, [id]);

    const { trigger, loading, error } = useAsyncAction(async () => {
        if (game) {
            const createdGame = await gameService.update(game);
            console.log(createdGame);
            navigate(`/games/${createdGame.id}`);
        }
    });

    return (
        <Container disableGutters>
            {game && (
                <GameInfoForm
                    game={game}
                    setGame={setGame}
                    onSubmit={trigger}
                    loading={loading}
                    error={error}
                />
            )}
        </Container>
    );
}
