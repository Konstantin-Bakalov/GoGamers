import {
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
} from '@mui/material';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedGameModel } from 'shared';
import { useAsync } from '../hooks/use-async';
import { gameService } from '../services/games-service';

export function EditGamePage() {
    const { id } = useParams();

    const [game, setGame] = useState<DetailedGameModel | undefined>();

    const { data, loading } = useAsync(async () => {
        const game = await gameService.loadGameById(Number(id));
        setGame(game);
    }, [id]);

    return <Container disableGutters>{game?.name}</Container>;
}
