import { Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailedGameModel } from 'shared';
import { useAsync } from '../../hooks/use-async';
import { useAsyncAction } from '../../hooks/use-async-action';
import { gameService } from '../../services/games-service';
import { GameInfoForm } from './game-info-form';

export function EditGamePage() {
    const [game, setGame] = useState<DetailedGameModel>();
    const { id } = useParams();
    const navigate = useNavigate();

    useAsync(async () => {
        const result = await gameService.loadGameById(Number(id));
        setGame(result);
    }, [id]);

    const { trigger, loading, error } = useAsyncAction(async () => {
        if (game) {
            const createdGame = await gameService.update(game);

            navigate(`/games/${createdGame.id}`, { replace: true });
        }
    });

    return <Container disableGutters>nothing</Container>;
}
