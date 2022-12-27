import {
    Alert,
    Box,
    Checkbox,
    FormControlLabel,
    TextField,
} from '@mui/material';
import { PropsWithChildren } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LoadingButton } from '@mui/lab';
import { useValidation } from '../../hooks/use-validation';
import { GenreSelect } from './genre-select';

interface GameInfo {
    name: string;
    freeToPlay: boolean;
    releaseDate: Date;
    developer: string;
    price?: number | undefined;
    description: string;
    genres: { name: string }[];
}

interface FormProps<T> {
    game: T;
    onInput: (game: T) => void;
    onGenreChange: (game: T) => void;
    onSubmit: () => void;
    loading: boolean;
    error: unknown;
}

export function GameInfoForm<T extends GameInfo>({
    game,
    onSubmit,
    onGenreChange,
    onInput,
    loading,
    error,
    children,
}: PropsWithChildren<FormProps<T>>) {
    const { validationError } = useValidation({ error });

    const checkBoxHandler = () =>
        onInput({ ...game, freeToPlay: !game.freeToPlay });

    const helperText = (name: string, message: string | undefined) => {
        if (message) {
            const split = message.split(' ');
            split[0] = name;
            return split.join(' ');
        }
    };

    return (
        <Box
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
                onChange={(e) => onInput({ ...game, name: e.target.value })}
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
                    onInput({ ...game, developer: e.target.value })
                }
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={game.freeToPlay}
                        onChange={checkBoxHandler}
                    />
                }
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
                    onInput({ ...game, price: Number(e.target.value) })
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
                    onInput({ ...game, description: e.target.value })
                }
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={game.releaseDate}
                    label={'Release Date'}
                    onChange={(date) => {
                        if (date) {
                            onInput({ ...game, releaseDate: date });
                        }
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            {validationError?.genres && (
                <Alert severity="error">
                    You must select at least one genre
                </Alert>
            )}

            {/* {children} */}

            <GenreSelect
                onChange={(genres: { name: string }[]) =>
                    onGenreChange({ ...game, genres })
                }
                defaultGenres={game.genres}
            />

            <LoadingButton
                loading={loading}
                onClick={onSubmit}
                variant="contained"
            >
                Submit
            </LoadingButton>
        </Box>
    );
}
