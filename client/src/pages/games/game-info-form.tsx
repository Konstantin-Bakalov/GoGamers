import {
    Alert,
    Box,
    Button,
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
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '../../lib/make-styles';

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
    edit?: boolean;
    loading: boolean;
    error: unknown;
}

const styles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    lineContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        flexDirection: {
            xs: 'column',
            sm: 'row',
            md: 'row',
            lg: 'row',
            xl: 'row',
        },
    },
    width: {
        width: {
            xs: '100%',
            sm: '50%',
            md: '50%',
            lg: '50%',
            xl: '50%',
        },
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 1.5,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2,
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2,
            },
        },
    },
    button: {
        '&.MuiButton-outlined': {
            borderColor: 'primary.main',
            borderWidth: 1.5,
        },
    },
});

export function GameInfoForm<T extends GameInfo>({
    game,
    onSubmit,
    onGenreChange,
    onInput,
    edit,
    loading,
    error,
    children,
}: PropsWithChildren<FormProps<T>>) {
    const navigate = useNavigate();
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
        <Box sx={styles.container}>
            <Box sx={styles.lineContainer}>
                <TextField
                    sx={{ ...styles.width, ...styles.textField }}
                    value={game.name}
                    error={!!validationError?.name}
                    helperText={helperText('Name', validationError?.name)}
                    required
                    autoComplete="off"
                    size="medium"
                    variant="outlined"
                    label="Name"
                    onChange={(e) => onInput({ ...game, name: e.target.value })}
                />

                <TextField
                    sx={{ ...styles.width, ...styles.textField }}
                    value={game.developer}
                    error={!!validationError?.developer}
                    helperText={helperText(
                        'Developer',
                        validationError?.developer,
                    )}
                    required
                    autoComplete="off"
                    size="medium"
                    variant="outlined"
                    label="Developer"
                    onChange={(e) =>
                        onInput({ ...game, developer: e.target.value })
                    }
                />
            </Box>

            <TextField
                sx={styles.textField}
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
                size="medium"
                label="Description"
                onChange={(e) =>
                    onInput({ ...game, description: e.target.value })
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

            <Box sx={styles.lineContainer}>
                <TextField
                    sx={{ ...styles.width, ...styles.textField }}
                    value={game.price ?? 0}
                    error={!!validationError?.price}
                    helperText={helperText('Price', validationError?.price)}
                    required
                    autoComplete="off"
                    size="medium"
                    disabled={game.freeToPlay}
                    type="number"
                    variant="outlined"
                    label="Price"
                    onChange={(e) =>
                        onInput({ ...game, price: Number(e.target.value) })
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
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                sx={{ ...styles.width, ...styles.textField }}
                            />
                        )}
                    />
                </LocalizationProvider>
            </Box>

            <GenreSelect
                onChange={(genres: { name: string }[]) =>
                    onGenreChange({
                        ...game,
                        genres,
                    })
                }
                defaultGenres={game.genres}
            />

            {validationError?.genres && (
                <Alert severity="error">
                    {validationError.genres.replace('Array', 'Genres')}
                </Alert>
            )}

            {children}

            <Box sx={styles.lineContainer}>
                <Button
                    sx={styles.button}
                    variant="outlined"
                    size="large"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </Button>

                <LoadingButton
                    size="large"
                    color="primary"
                    loading={loading}
                    onClick={onSubmit}
                    variant="contained"
                >
                    {edit ? <>Update Game</> : <>Create Game</>}
                </LoadingButton>
            </Box>
        </Box>
    );
}
