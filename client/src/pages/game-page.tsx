import { Box, CircularProgress, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { GameCard } from '../components/game-card';
import { useAsync } from '../hooks/use-async';
import { gameService } from '../services/games-service';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCurrentUser } from '../hooks/use-current-user';
import { useState } from 'react';
import { DeleteGameDialog } from '../dialogs/delete-game-dialog';
import { useAsyncAction } from '../hooks/use-async-action';

export function GamePage() {
    const { id } = useParams();
    const user = useCurrentUser();
    const [openDialog, setOpenDialog] = useState(false);

    const navigate = useNavigate();

    const { data: game, loading } = useAsync(
        () => gameService.loadGameById(Number(id)),
        [id],
    );

    const { trigger } = useAsyncAction(() =>
        gameService.deleteById(Number(game?.id)),
    );

    const handleOpen = () => setOpenDialog(true);

    const handleClose = () => setOpenDialog(false);

    return (
        <Container disableGutters>
            {loading && <CircularProgress />}

            {user && user.id === game?.userId && (
                <IconButton aria-label="delete" onClick={handleOpen}>
                    <DeleteIcon />
                </IconButton>
            )}

            {openDialog && (
                <DeleteGameDialog
                    onClose={handleClose}
                    onSubmit={() => {
                        trigger();
                        navigate('/');
                    }}
                />
            )}

            {game && (
                <Box>
                    <GameCard game={game} />
                </Box>
            )}
        </Container>
    );
}
