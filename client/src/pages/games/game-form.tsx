import { Box } from '@mui/material';
import { GameModelRequest, MediaRequestModel } from 'shared';
import { useMediaForm } from '../../hooks/use-image-form';
import { useAsyncAction } from '../../hooks/use-async-action';
import { GameInfoForm, SetGameType } from './game-info-form';

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
                setGame={setGame}
                onSubmit={trigger}
                loading={uploadLoading}
                error={error}
            >
                {render}
            </GameInfoForm>
        </Box>
    );
}
