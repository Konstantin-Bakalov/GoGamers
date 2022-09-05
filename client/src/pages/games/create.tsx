import { LoadingButton } from '@mui/lab';
import {
    Alert,
    CircularProgress,
    Container,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from '@mui/material';
import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsync } from '../../hooks/use-async';
import { useAsyncAction } from '../../hooks/use-async-action';
import { gameService } from '../../services/games-service';
import { genreService } from '../../services/genre-service';
import { HttpError } from '../../services/http-service';
import { ValidationError } from 'shared';

// interface ValidationError {
//     fieldErrors: Record<string, string[]>;
//     formErrors: string[];
// }

export function CreateGame() {
    const [input, setInput] = useState({
        name: '',
        minAge: '',
        genres: [] as string[],
    });

    const navigate = useNavigate();

    const { trigger, loading, error } = useAsyncAction(async (e: FormEvent) => {
        e.preventDefault();

        const game = await gameService.create({
            name: input.name,
            minAge: Number(input.minAge),
            genres: input.genres,
        });

        navigate(`/games/${game.id}`);
    });

    const { data: allGenres, loading: loadingGenres } = useAsync(
        () => genreService.all(),
        [],
    );

    // const validationError = useMemo(() => {
    //     if (!error) {
    //         return undefined;
    //     }

    //     if (error instanceof HttpError && error.body.fieldErrors) {
    //         return error.body as ValidationError;
    //     }

    //     return undefined;
    // }, [error]);

    return (
        <Container>
            <TextField
                value={input.name}
                // error={!!validationError?.fieldErrors['name']}
                // helperText={validationError?.fieldErrors['name']?.join(', ')}
                variant="outlined"
                size="small"
                label="Name"
                onChange={(e) => setInput({ ...input, name: e.target.value })}
            />

            <TextField
                value={input.minAge}
                // error={!!validationError?.fieldErrors['minAge']}
                // helperText={validationError?.fieldErrors['minAge']?.join(', ')}
                variant="outlined"
                size="small"
                label="Min Age"
                onChange={(e) => setInput({ ...input, minAge: e.target.value })}
            />

            {loadingGenres && <CircularProgress />}

            {allGenres && (
                <>
                    <Select
                        multiple
                        input={<OutlinedInput label="Genres" />}
                        value={input.genres}
                        onChange={(e) => {
                            const value = e.target.value;
                            const genreNames =
                                typeof value === 'string'
                                    ? value.split(',')
                                    : value;

                            setInput({ ...input, genres: genreNames });
                        }}
                    >
                        {allGenres?.map((genre) => (
                            <MenuItem key={genre.id} value={genre.name}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>

                    {/* {!!validationError?.fieldErrors['genres'] && (
                        <Alert severity="error">
                            {validationError?.fieldErrors['genres']?.join(', ')}
                        </Alert>
                    )} */}
                </>
            )}

            {!!error && error instanceof ValidationError && (
                <Alert severity="error">{error?.message}</Alert>
            )}

            {/* <>
                {validationError &&
                    validationError.formErrors.map((message) => (
                        <Alert key={message} severity="error">
                            {message}
                        </Alert>
                    ))}
            </> */}

            {/* <>
                {!validationError && error && (
                    <Alert severity="error">Something went wrong</Alert>
                )}
            </> */}

            <LoadingButton
                loading={loading}
                onClick={trigger}
                variant="contained"
            >
                Submit
            </LoadingButton>
        </Container>
    );
}
