import {
    Alert,
    Box,
    CircularProgress,
    IconButton,
    Pagination,
} from '@mui/material';
import { Container } from '@mui/system';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { GameCard } from '../components/game-card';
import { useAsync } from '../hooks/use-async';
import { gameService } from '../services/games-service';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCurrentUser } from '../hooks/use-current-user';
import {
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { DeleteGameDialog } from '../dialogs/delete-game-dialog';
import { useAsyncAction } from '../hooks/use-async-action';
import { ForbiddenError, ReviewModelDetailed } from 'shared';
import { ReviewForm } from '../components/review-form';
import { reviewService } from '../services/reviews-service';
import { ReviewList } from '../components/review-list';

export interface PageState {
    page: string;
}

function stateToParams(state: PageState): URLSearchParams {
    return new URLSearchParams({ page: state.page });
}

function paramsToState(params: URLSearchParams): PageState {
    return {
        page: params.get('page') || '1',
    };
}

export function GamePage() {
    const { id } = useParams();
    const user = useCurrentUser();
    const [openDialog, setOpenDialog] = useState(false);
    const [forbiddenError, setForbiddenError] = useState<string | undefined>(
        undefined,
    );

    const [searchParams, setSearchParams] = useSearchParams();
    const state = useMemo(() => paramsToState(searchParams), [searchParams]);

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
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const ref = useRef();

    // useAsync(async () => {
    //     const reviews = await reviewService.list(Number(id), state);
    //     setReviews(reviews.results);
    //     setTotal(reviews.total);
    // }, [state]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            console.log(entry);
        });

        if (ref.current) observer.observe(ref.current);
    }, []);

    useAsync(async () => {
        const res = await reviewService.list(Number(id), state);
        setReviews((prev) => [...prev, ...res.results]);
    }, [state]);

    const lastReview = useCallback((node: ReactNode) => {
        console.log(node);
    }, []);

    const { trigger: submit } = useAsyncAction(
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
            handleClose();
        }
    }, [error]);

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

            {forbiddenError && (
                <Container>
                    <Alert severity="error">{forbiddenError}</Alert>
                </Container>
            )}

            {openDialog && (
                <DeleteGameDialog onClose={handleClose} onSubmit={trigger} />
            )}

            {game && (
                <Box>
                    <GameCard game={game} />
                    <ReviewForm gameId={game.id} onSubmit={submit} />
                    {reviews.map((review, index) => {
                        if (index === reviews.length - 1) {
                            return (
                                <Box ref={ref} key={index}>
                                    {review.body}
                                </Box>
                            );
                        }

                        return <Box key={index}>{review.body}</Box>;
                    })}
                    {/* <ReviewList reviews={reviews} /> */}
                    {/* <Pagination
                        shape="rounded"
                        variant="outlined"
                        count={Math.ceil(total / 3)}
                        page={Number(state.page)}
                        onChange={(e, value) => {
                            setSearchParams({ page: value.toString() });
                        }}
                    /> */}
                </Box>
            )}
        </Container>
    );
}
