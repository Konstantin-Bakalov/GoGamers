import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {
    Alert,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useEffect, useState } from 'react';
import { GameModelRequest, ValidationError } from 'shared';
import { SetGameType, ValidationErrorMessage } from '../pages/games/game-form';
import { GenreSelect } from '../pages/games/genre-select';
import { LoadingButton } from '@mui/lab';

interface GameFormWithoutMedia {
    game: GameModelRequest;
    setGame: SetGameType;
    error: unknown;
}

export function GameFormWithoutMedia({
    game,
    setGame,
    error,
}: GameFormWithoutMedia) {
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

    const helperText = (name: string, message: string | undefined) => {
        if (message) {
            const split = message.split(' ');
            split[0] = name;
            return split.join(' ');
        }
    };

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
                helperText={helperText('Name', validationError?.name)}
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
                error={!!validationError?.developer}
                helperText={helperText('Developer', validationError?.developer)}
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
                error={!!validationError?.price}
                helperText={helperText('Price', validationError?.price)}
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
                error={!!validationError?.description}
                helperText={helperText(
                    'Description',
                    validationError?.description,
                )}
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

            <GenreSelect
                onChange={(genres: { name: string }[]) =>
                    setGame((prev) => {
                        return { ...prev, genres };
                    })
                }
            />

            {validationError?.genres && (
                <Alert severity="error">
                    You must select at least one genre
                </Alert>
            )}

            <LoadingButton>Submit</LoadingButton>
        </Container>
    );
}
