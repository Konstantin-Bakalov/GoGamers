import { LoadingButton } from '@mui/lab';
import { Box, CircularProgress, Container } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../hooks/use-async-action';
import { gameService } from '../services/games-service';
import { Image } from '../components/media-upload';
import placeholder from '../images/empty-image.png';
import { mediaUploadService } from '../services/media-upload-service';
import { GameForm } from './games/game-form';
import { GameModelRequest, User } from 'shared';
import { useCurrentUser } from '../hooks/use-current-user';

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

    // const [image, setImage] = useState<Image>(emptyImage);
    const navigate = useNavigate();

    const {
        trigger: submit,
        loading,
        error,
    } = useAsyncAction(async (e: FormEvent) => {
        e.preventDefault();
        console.log(game);
        // const url = await mediaUploadService.upload(image.imageFile);

        // const g = await gameService.create({
        //     name: game.name,
        //     minAge: Number(game.minAge),
        //     genres: game.genres,
        //     url,
        //     type: 'image',
        // });

        // navigate(`/games/${g.id}`);
    });

    // const validateImage = () => {
    //     return image.source !== emptyImage.source;
    // };

    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
            {loading && <CircularProgress />}
            <GameForm
                game={game}
                setGame={setGame}
                // setImage={setImage}
                error={error}
            />

            <LoadingButton
                loading={loading}
                // disabled={!validateImage()}
                onClick={submit}
                variant="contained"
            >
                Submit
            </LoadingButton>
        </Container>
    );
}
