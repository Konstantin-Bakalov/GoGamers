import { LoadingButton } from '@mui/lab';
import { CardMedia, CircularProgress, Container } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../../hooks/use-async-action';
import { gameService } from '../../services/games-service';
import { Image } from '../../components/media-upload';
import placeholder from '../../images/empty-image.png';
import { mediaUploadService } from '../../services/media-upload-service';
import { GameForm } from './game-form';

const emptyImage: Image = {
    imageFile: new File([''], 'filename'),
    source: placeholder,
};

export function CreateGame() {
    const [input, setInput] = useState({
        name: '',
        minAge: '',
        genres: [] as string[],
    });

    const [image, setImage] = useState<Image>(emptyImage);
    const navigate = useNavigate();

    const { trigger, loading, error } = useAsyncAction(async (e: FormEvent) => {
        e.preventDefault();

        const url = await mediaUploadService.upload(image.imageFile);

        const game = await gameService.create({
            name: input.name,
            minAge: Number(input.minAge),
            genres: input.genres,
            url,
            type: 'image',
        });

        navigate(`/games/${game.id}`);
    });

    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
            {loading && <CircularProgress />}
            <GameForm setImage={setImage} error={error} />

            {image && (
                <CardMedia
                    sx={{}}
                    component="img"
                    width="100"
                    height="250"
                    image={image?.source}
                    alt="green iguana"
                />
            )}

            <LoadingButton
                loading={loading}
                disabled={!image}
                onClick={trigger}
                variant="contained"
            >
                Submit
            </LoadingButton>
        </Container>
    );
}
