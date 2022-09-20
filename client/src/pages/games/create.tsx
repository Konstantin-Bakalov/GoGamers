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
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsync } from '../../hooks/use-async';
import { useAsyncAction } from '../../hooks/use-async-action';
import { gameService } from '../../services/games-service';
import { genreService } from '../../services/genre-service';
import { ValidationError } from 'shared';

interface ValidationErrorMessage {
    name?: string;
    minAge?: string;
    genres?: string;
}

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

    return (
        <Container>
            {(loading || loadingGenres) && <CircularProgress />}

            <TextField
                value={input.name}
                error={!!validationError?.name}
                helperText={validationError?.name}
                variant="outlined"
                size="small"
                label="Name"
                onChange={(e) => setInput({ ...input, name: e.target.value })}
            />

            <TextField
                value={input.minAge}
                error={!!validationError?.minAge}
                helperText={validationError?.minAge}
                variant="outlined"
                size="small"
                label="Min Age"
                onChange={(e) => setInput({ ...input, minAge: e.target.value })}
            />

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
                </>
            )}

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
