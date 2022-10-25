import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { GameModelRequest, MediaRequestModel, ValidationError } from 'shared';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AddMediaDialog } from '../../dialogs/add-media-dialog';
import { GenreSelect } from './genre-select';

interface ValidationErrorMessage {
    name?: string;
    minAge?: string;
    genres?: string;
}

export type SetGameType = (
    game: GameModelRequest | ((prev: GameModelRequest) => GameModelRequest),
) => void;

interface GameFormProps {
    game: GameModelRequest;
    setGame: SetGameType;
    error: unknown;
}

export function GameForm({ game, setGame, error }: GameFormProps) {
    const [openImageDialog, setOpenImageDialog] = useState(false);

    const onClose = () => {
        setOpenImageDialog(false);
    };

    const [validationError, setValidationError] = useState<
        ValidationErrorMessage | undefined
    >(undefined);

    useEffect(() => {
        if (!error) {
            setValidationError(undefined);
        }

        if (error instanceof ValidationError) {
            setValidationError(error.data);
            return;
        }

        setValidationError(undefined);
    }, [error]);

    const checkBoxHandler = () =>
        setGame((prev) => {
            return {
                ...prev,
                freeToPlay: !prev.freeToPlay,
            };
        });

    return (
        <Container
            disableGutters
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginTop: '20px',
            }}
        >
            <TextField
                value={game.name}
                error={!!validationError?.name}
                helperText={validationError?.name}
                required
                variant="outlined"
                size="small"
                label="Name"
                onChange={(e) =>
                    setGame((prev) => {
                        return { ...prev, name: e.target.value };
                    })
                }
            />

            <TextField
                value={game.developer}
                // error={!!validationError?.develooper}
                // helperText={validationError?.developer}
                required
                variant="outlined"
                size="small"
                label="Developer"
                onChange={(e) =>
                    setGame((prev) => {
                        return { ...prev, developer: e.target.value };
                    })
                }
            />

            <FormControlLabel
                control={<Checkbox onChange={checkBoxHandler} />}
                label="Free to play"
            />

            <TextField
                value={game.price ?? 0}
                // error={!!validationError?.price}
                // helperText={validationError?.price}
                required
                disabled={game.freeToPlay}
                type="number"
                variant="outlined"
                size="small"
                label="Price"
                onChange={(e) =>
                    setGame((prev) => {
                        return { ...prev, price: Number(e.target.value) };
                    })
                }
            />

            <TextField
                value={game.description}
                // error={!!validationError?.description}
                // helperText={validationError?.description}
                required
                multiline
                minRows={5}
                variant="outlined"
                size="small"
                label="Description"
                onChange={(e) =>
                    setGame((prev) => {
                        return { ...prev, description: e.target.value };
                    })
                }
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={game.releaseDate}
                    label={'Release Date'}
                    onChange={(date) => {
                        if (date) {
                            setGame((prev) => {
                                return { ...prev, releaseDate: date };
                            });
                        }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            {openImageDialog && (
                <AddMediaDialog
                    onClose={onClose}
                    onSubmit={(media: MediaRequestModel[]) => {
                        setGame((prev) => {
                            return { ...prev, media };
                        });

                        onClose();
                    }}
                />
            )}

            <GenreSelect
                onChange={(genres: { name: string }[]) =>
                    setGame((prev) => {
                        return { ...prev, genres };
                    })
                }
            />

            <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={() => setOpenImageDialog(true)}
            >
                <Typography>Add Images</Typography>
            </Button>
        </Container>
    );
}
