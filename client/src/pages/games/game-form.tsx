import {
    Container,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { ValidationError } from 'shared';
import { useAsync } from '../../hooks/use-async';
import { genreService } from '../../services/genre-service';
import { Image, MediaUpload } from '../../components/media-upload';

interface ValidationErrorMessage {
    name?: string;
    minAge?: string;
    genres?: string;
}

interface GameFormProps {
    setImage: (image: Image) => void;
    error: unknown;
}

export function GameForm({ setImage, error }: GameFormProps) {
    const [name, setName] = useState('');
    const [minAge, setMinAge] = useState('');
    const [genres, setGenres] = useState<string[]>([]);

    const [validationError, setValidationError] = useState<
        ValidationErrorMessage | undefined
    >(undefined);

    const { data: allGenres, loading: loadingGenres } = useAsync(
        () => genreService.all(),
        [],
    );

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
        <Container
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
            <TextField
                value={name}
                error={!!validationError?.name}
                helperText={validationError?.name}
                variant="outlined"
                size="small"
                label="Name"
                onChange={(e) => setName(e.target.value)}
            />

            <TextField
                value={minAge}
                error={!!validationError?.minAge}
                helperText={validationError?.minAge}
                variant="outlined"
                size="small"
                label="Min Age"
                onChange={(e) => setMinAge(e.target.value)}
            />

            {allGenres && (
                <>
                    <FormControl error={!!validationError?.genres}>
                        <InputLabel>Genres</InputLabel>
                        <Select
                            label="Genres"
                            multiple
                            value={genres}
                            onChange={(e) => {
                                const value = e.target.value;
                                const genreNames =
                                    typeof value === 'string'
                                        ? value.split(',')
                                        : value;

                                setGenres(genreNames);
                            }}
                        >
                            {allGenres?.map((genre) => (
                                <MenuItem key={genre.id} value={genre.name}>
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>
                            {validationError?.genres}
                        </FormHelperText>
                    </FormControl>
                </>
            )}

            <MediaUpload
                onImageSelected={(imageFile: File, source: string) =>
                    setImage({ imageFile, source })
                }
            />
        </Container>
    );
}
