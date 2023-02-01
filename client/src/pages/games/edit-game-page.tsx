import { Alert, Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MediaModel } from 'shared';
import { UpdateGameModel } from 'shared/src/models/game-model';
import { useAsync } from '../../hooks/use-async';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useMediaEditForm } from '../../hooks/use-media-edit-form';
import { useValidation } from '../../hooks/use-validation';
import { makeStyles } from '../../lib/make-styles';
import { gameService } from '../../services/games-service';
import { GameInfoForm } from './game-info-form';

const styles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: '20px',
        width: {
            xs: '90%',
            sm: '90%',
            md: '50%',
            lg: '50%',
            xl: '35%',
        },
        marginTop: {
            xs: '114px',
            sm: '69px',
            md: '69px',
            lg: '69px',
            xl: '69px',
        },
    },
});

export function EditGamePage() {
    const [game, setGame] = useState<UpdateGameModel>();
    const { id } = useParams();
    const navigate = useNavigate();

    useAsync(async () => {
        const result = await gameService.loadGameById(Number(id));
        setGame(result);
    }, [id]);

    const { render, perform, validate } = useMediaEditForm(
        game?.media as MediaModel[],
    );

    const {
        trigger: submitGame,
        loading,
        error,
    } = useAsyncAction(async () => {
        if (game && validate()) {
            const media = await perform();

            const updatedGame = await gameService.update({
                ...game,
                media,
            });

            navigate(`/games/${updatedGame.id}`);
        }
    });

    const { validationError } = useValidation({ error });

    return (
        <Container disableGutters maxWidth={false} sx={styles.container}>
            <Typography
                variant="h4"
                fontWeight={700}
                sx={{ alignSelf: 'center' }}
            >
                Edit Game
            </Typography>

            {game && (
                <GameInfoForm
                    game={game}
                    onInput={(game: UpdateGameModel) =>
                        setGame((prev) => {
                            if (prev) {
                                return { ...prev, ...game };
                            }
                        })
                    }
                    onGenreChange={(game) => setGame(game)}
                    onSubmit={submitGame}
                    loading={loading}
                    error={error}
                >
                    {render}
                    {validationError?.media && (
                        <Alert severity="error">{validationError.media}</Alert>
                    )}
                </GameInfoForm>
            )}
        </Container>
    );
}
