import { Alert, Box, CircularProgress } from '@mui/material';
import { Container } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '../hooks/use-async';
import { gameService } from '../services/games-service';
import { useCurrentUser } from '../hooks/use-current-user';
import { useEffect, useState } from 'react';
import { DeleteGameDialog } from '../dialogs/delete-game-dialog';
import { useAsyncAction } from '../hooks/use-async-action';
import { ForbiddenError, ReviewModelDetailed } from 'shared';
import { ReviewForm } from '../components/review-form';
import { reviewService } from '../services/reviews-service';
import { ReviewList } from '../components/review-list';
import { GameMedia } from '../components/game-media';
import { DeleteAndEditButtons } from '../components/delete-and-edit-buttons';

export function GamePage() {
    const { id } = useParams();
    const user = useCurrentUser();
    const [deleteDialog, setDeleteDialog] = useState(false);

    const [forbiddenError, setForbiddenError] = useState<string | undefined>(
        undefined,
    );

    const navigate = useNavigate();

    const { data: game, loading } = useAsync(
        () => gameService.loadGameById(Number(id)),
        [id],
    );

    const { trigger, error: error } = useAsyncAction(async () => {
        await gameService.deleteById(Number(game?.id));
        navigate('/');
    });

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

    useEffect(() => {
        if (!error) {
            setForbiddenError(undefined);
        }

        if (error instanceof ForbiddenError) {
            setForbiddenError(error.message);
            deleteDialogClose();
        }
    }, [error]);

    const deleteDialogOpen = () => setDeleteDialog(true);

    const deleteDialogClose = () => setDeleteDialog(false);

    return (
        <Container disableGutters>
            {loading && <CircularProgress />}

            {user && user.id === game?.userId && (
                <DeleteAndEditButtons
                    onClickDeleteButton={deleteDialogOpen}
                    onClickEditButton={() => navigate(`/edit/${id}`)}
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
                <Box>
                    <GameMedia media={game.media} />
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
