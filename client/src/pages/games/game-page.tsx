import { CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/use-async';
import { gameService } from '../../services/games-service';

export function GamePage() {
    const { id } = useParams();

    const { data: game, loading } = useAsync(
        () => gameService.loadGameById(Number(id)),
        [id],
    );

    return (
        <Container>
            {loading && <CircularProgress />}

            {game && (
                <Typography>
                    Game: {game.name} id: {game.id}
                </Typography>
            )}
        </Container>
    );
}
