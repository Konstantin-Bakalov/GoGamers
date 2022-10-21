import {
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { GameModelRequest, ValidationError } from 'shared';
import { useAsync } from '../../hooks/use-async';
import { genreService } from '../../services/genre-service';
import { Image, MediaUpload } from '../../components/media-upload';

interface ValidationErrorMessage {
    name?: string;
    minAge?: string;
    genres?: string;
}

interface GameFormProps {
    game: GameModelRequest;
    setGame: (
        game: GameModelRequest | ((prev: GameModelRequest) => GameModelRequest),
    ) => void;
    setImage: (image: Image) => void;
    error: unknown;
}

export function GameForm({ game, setGame, setImage, error }: GameFormProps) {
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
