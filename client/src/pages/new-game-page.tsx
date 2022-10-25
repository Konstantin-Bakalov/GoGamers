import { LoadingButton } from '@mui/lab';
import { CircularProgress, Container } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../hooks/use-async-action';
import { GameForm } from './games/game-form';
import { GameModelRequest, User } from 'shared';
import { useCurrentUser } from '../hooks/use-current-user';
import { gameService } from '../services/games-service';

export function NewGamePage() {
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

    const navigate = useNavigate();

    const {
        trigger: submit,
        loading,
        error,
    } = useAsyncAction(async (e: FormEvent) => {
        e.preventDefault();

        const createdGame = await gameService.create(game);

        navigate(`/games/${createdGame.id}`);
    });

    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
            {loading && <CircularProgress />}

            <GameForm game={game} setGame={setGame} error={error} />

            <LoadingButton
                loading={loading}
                onClick={submit}
                variant="contained"
            >
                Submit
            </LoadingButton>
        </Container>
    );
}
