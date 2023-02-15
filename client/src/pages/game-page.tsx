import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import { useAsync } from '../hooks/use-async';
import { gameService } from '../services/games-service';
import { useCurrentUser } from '../hooks/use-current-user';
import { useState } from 'react';
import { DeleteGameDialog } from '../dialogs/delete-game-dialog';
import { useAsyncAction } from '../hooks/use-async-action';
import { ReviewModelDetailed } from 'shared';
import { reviewService } from '../services/reviews-service';
import { GameMedia } from '../components/game/game-media';
import { GameInfos } from '../components/game/game-infos';
import { makeStyles } from '../lib/make-styles';
import { useValidation } from '../hooks/use-validation';
import { DeleteEditControls } from '../components/delete-edit-controls';
import { GameDescription } from '../components/game/game-description';
import { ReviewsContainer } from '../components/review/reviews-container';

const styles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: {
            xs: '95%',
            sm: '95%',
            md: '90%',
            lx: '75%',
            xl: '75%',
        },
        marginTop: {
            xs: '134px',
            sm: '89px',
            md: '89px',
            lg: '89px',
            xl: '89px',
        },
    },
    title: {
        display: 'flex',
        gap: '10px',
        justifyContent: {
            xs: 'center',
            sm: 'center',
            md: 'center',
            lg: 'flex-start',
            xl: 'flex-start',
        },
    },
    media: {
        display: 'flex',
        alignItems: {
            xs: 'center',
            sm: 'center',
            md: 'center',
            lg: 'flex-start',
            xl: 'flex-start',
        },
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'column',
            lg: 'row',
            xl: 'row',
        },
        gap: '2rem',
    },
    margin: {
        marginTop: '3rem',
    },
    align: {
        alignSelf: 'center',
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
        <Container disableGutters maxWidth={false} sx={styles.container}>
            <Box sx={styles.title}>
                <Typography variant="h3" fontWeight={700}>
                    {game?.name}
                </Typography>

                <Box sx={styles.align}>
                    {user && user.id === game?.userId && (
                        <DeleteEditControls
                            onDelete={deleteDialogOpen}
                            onEdit={onEdit}
                        />
                    )}
                </Box>
            </Box>

            {loading && <CircularProgress sx={styles.align} />}

            {forbiddenError && (
                <Alert sx={styles.align} severity="error">
                    {forbiddenError}
                </Alert>
            )}

            {deleteDialog && (
                <DeleteGameDialog
                    onClose={deleteDialogClose}
                    onSubmit={trigger}
                />
            )}

            {game && (
                <Box sx={styles.media}>
                    <GameMedia media={game.media} />
                    <GameInfos {...game} />
                </Box>
            )}

            <Box sx={styles.margin}>
                {game && <GameDescription description={game.description} />}
            </Box>

            <Box sx={styles.margin}>
                {game && (
                    <ReviewsContainer
                        gameId={game.id}
                        loading={createLoading}
                        onSubmit={submit}
                        reviews={reviews}
                        nextPage={nextPage}
                        scrollLoading={scrollLoading}
                    />
                )}
            </Box>
        </Container>
    );
}
