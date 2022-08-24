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
import { FormEvent, useState } from 'react';
import { useAsync } from '../../hooks/useAsync';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { genreService } from '../../services/genre-service';

export function CreateGame() {
    const [input, setInput] = useState({
        name: '',
        minAge: '',
        genres: [] as string[],
    });

    const { trigger, loading, error } = useAsyncAction(async (e: FormEvent) => {
        e.preventDefault();
    });

    const {
        data: allGenres,
        loading: loadingGenres,
        error: errorGenres,
    } = useAsync(() => genreService.all(), []);

    return (
        <Container component="form" onSubmit={trigger}>
            <TextField
                value={input.name}
                variant="outlined"
                size="small"
                label="Name"
                onChange={(e) => setInput({ ...input, name: e.target.value })}
            />

            <TextField
                value={input.minAge}
                variant="outlined"
                size="small"
                label="Min Age"
                onChange={(e) => setInput({ ...input, minAge: e.target.value })}
            />

            {loadingGenres && <CircularProgress />}
            <>
                {errorGenres && (
                    <Alert severity="error">Could not load genres</Alert>
                )}
            </>

            <Select
                multiple
                input={<OutlinedInput label="Genres" />}
                value={input.genres}
                onChange={(e) => {
                    const value = e.target.value;
                    const genreNames =
                        typeof value === 'string' ? value.split(',') : value;

                    setInput({ ...input, genres: genreNames });
                }}
            >
                {allGenres?.map((genre) => (
                    <MenuItem key={genre.id} value={genre.name}>
                        {genre.name}
                    </MenuItem>
                ))}
            </Select>

            <LoadingButton loading={loading} variant="contained">
                Submit
            </LoadingButton>
        </Container>
    );
}
