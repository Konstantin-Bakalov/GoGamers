import { Box } from '@mui/material';
import { GameModelRequest, MediaRequestModel } from 'shared';
import { useMediaForm } from '../../hooks/use-image-form';
import { useAsyncAction } from '../../hooks/use-async-action';
import { GameInfoForm } from './game-info-form';
import { GenreSelect } from './genre-select';

type SetGameType = (
    game: GameModelRequest | ((prev: GameModelRequest) => GameModelRequest),
) => void;

interface GameFormProps {
    game: GameModelRequest;
    setGame: SetGameType;
    onSubmit: (media: MediaRequestModel[]) => void;
    error: unknown;
}

export function GameForm({ game, setGame, onSubmit, error }: GameFormProps) {
    const { render, perform, validate } = useMediaForm();

    const { trigger, loading: uploadLoading } = useAsyncAction(async () => {
        if (validate()) {
            const media = await perform();
            onSubmit(media);
        }
    });

    return (
        <Box>
            <GameInfoForm
                game={game}
                onInput={(game: GameModelRequest) => setGame(game)}
                onSubmit={trigger}
                loading={uploadLoading}
                error={error}
            >
                <GenreSelect
                    onChange={(genres: { name: string }[]) =>
                        setGame((prev) => {
                            return { ...prev, genres };
                        })
                    }
                />
                {render}
            </GameInfoForm>
        </Box>
    );
}
