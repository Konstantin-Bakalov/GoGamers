import { Container, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../hooks/use-async-action';
import { GameForm } from './games/game-form';
import { GameModelRequest, MediaRequestModel, User } from 'shared';
import { useCurrentUser } from '../hooks/use-current-user';
import { gameService } from '../services/games-service';
import { makeStyles } from '../lib/make-styles';

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

export function NewGamePage() {
    const user = useCurrentUser() as User;

    const [game, setGame] = useState<GameModelRequest>({
        name: '',
        userId: user.id,
        releaseDate: new Date(),
        developer: '',
        freeToPlay: false,
        price: undefined,
        description: '',
        genres: [],
        media: [],
    });

    const navigate = useNavigate();

    const { trigger: submit, error } = useAsyncAction(
        async (media: MediaRequestModel[]) => {
            const createdGame = await gameService.create({ ...game, media });

            navigate(`/games/${createdGame.id}`);
        },
    );

    return (
        <Container disableGutters maxWidth={false} sx={styles.container}>
            <Typography
                variant="h4"
                fontWeight={700}
                sx={{ alignSelf: 'center' }}
            >
                Create New Game
            </Typography>

            <GameForm
                game={game}
                setGame={setGame}
                onSubmit={submit}
                error={error}
            />
        </Container>
    );
}
