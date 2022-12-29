import { Container } from '@mui/material';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MediaModel } from 'shared';
import { UpdateGameModel } from 'shared/src/models/game-model';
import { useAsync } from '../../hooks/use-async';
import { useAsyncAction } from '../../hooks/use-async-action';
import { useMediaEditForm } from '../../hooks/use-media-edit-form';
import { gameService } from '../../services/games-service';
import { GameInfoForm } from './game-info-form';

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
    console.log('game media', game?.media);
    return (
        <Container disableGutters>
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
                </GameInfoForm>
            )}
        </Container>
    );
}
