import { Box, CircularProgress } from '@mui/material';
import { Container } from '@mui/system';
import { useParams } from 'react-router-dom';
import { GameCard } from '../components/game-card';
import { useAsync } from '../hooks/use-async';
import { gameService } from '../services/games-service';

export function GamePage() {
    const { id } = useParams();

    const { data: game, loading } = useAsync(
        () => gameService.loadGameById(Number(id)),
        [id],
    );

    return (
        <Container disableGutters>
            {loading && <CircularProgress />}

            {game && (
                <Box>
                    <GameCard game={game} />
                </Box>
            )}
        </Container>
    );
}
