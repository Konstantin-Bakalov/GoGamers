import {
    Alert,
    Box,
    CircularProgress,
    IconButton,
    Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '../hooks/use-async';
import { gameService } from '../services/games-service';
import { useCurrentUser } from '../hooks/use-current-user';
import { useState } from 'react';
import { DeleteGameDialog } from '../dialogs/delete-game-dialog';
import { useAsyncAction } from '../hooks/use-async-action';
import { ReviewModelDetailed } from 'shared';
import { ReviewForm } from '../components/review-form';
import { reviewService } from '../services/reviews-service';
import { ReviewList } from '../components/review-list';
import { GameMedia } from '../components/game-media';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GameInfos } from '../components/game-infos';
import { makeStyles } from '../lib/make-styles';
import { useValidation } from '../hooks/use-validation';
import { DeleteEditControls } from '../components/delete-edit-controls';

const styles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: {
            xs: '114px',
            sm: '69px',
            md: '69px',
            lg: '69px',
            xl: '69px',
        },
    },
});

export function GamePage() {
    const { id } = useParams();
    const user = useCurrentUser();
    const [deleteDialog, setDeleteDialog] = useState(false);

    const navigate = useNavigate();

    const { data: game, loading } = useAsync(
        () => gameService.loadGameById(Number(id)),
        [id],
    );

    const { trigger, error: error } = useAsyncAction(async () => {
        await gameService.deleteById(Number(game?.id));
        navigate('/');
    });

    const { forbiddenError } = useValidation({ error });

    const [reviews, setReviews] = useState<ReviewModelDetailed[]>([]);
    const [page, setPage] = useState(1);

    const { loading: scrollLoading } = useAsync(async () => {
        const res = await reviewService.list(Number(id), String(page));
        setReviews((prev) => [...prev, ...res.results]);
    }, [page]);

    const nextPage = () => setPage((prev) => prev + 1);

    const { trigger: submit, loading: createLoading } = useAsyncAction(
        async (body: string, gameId: number) => {
            const newReview = await reviewService.create({ body, gameId });
            setReviews((prev) => [newReview, ...prev]);
        },
    );

    const deleteDialogOpen = () => setDeleteDialog(true);

    const deleteDialogClose = () => setDeleteDialog(false);

    const onEdit = () => navigate(`/games/${id}/edit`);

    return (
        <Container disableGutters sx={styles.container}>
            <Typography
                variant="h4"
                fontWeight={700}
                sx={{ alignSelf: 'center' }}
            >
                {game?.name}
            </Typography>

            {loading && <CircularProgress />}

            {user && user.id === game?.userId && (
                <DeleteEditControls
                    onDelete={deleteDialogOpen}
                    onEdit={onEdit}
                />
            )}

            {forbiddenError && (
                <Box>
                    <Alert severity="error">{forbiddenError}</Alert>
                </Box>
            )}

            {deleteDialog && (
                <DeleteGameDialog
                    onClose={deleteDialogClose}
                    onSubmit={trigger}
                />
            )}

            {game && (
                <Box sx={{ display: 'flex' }}>
                    <GameMedia media={game.media} />
                    <GameInfos {...game} />
                </Box>
            )}

            {game && (
                <Box>
                    <ReviewForm
                        gameId={game.id}
                        loading={createLoading}
                        onSubmit={submit}
                    />
                    <ReviewList reviews={reviews} nextPage={nextPage} />
                    {scrollLoading && <CircularProgress />}
                </Box>
            )}
        </Container>
    );
}
