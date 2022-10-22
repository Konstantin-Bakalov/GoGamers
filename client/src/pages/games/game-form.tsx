import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { GameModelRequest, ValidationError } from 'shared';
import { useAsync } from '../../hooks/use-async';
import { genreService } from '../../services/genre-service';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { BaseDialog } from '../../dialogs/base-dialog';

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
    // setImage: (image: Image) => void;
    error: unknown;
}

export function GameForm({ game, setGame, error }: GameFormProps) {
    const [genres, setGenres] = useState<string[]>([]);
    const [openImageDialog, setOpenImageDialog] = useState(false);

    const onClose = () => {
        setOpenImageDialog(false);
    };

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
            {openImageDialog && (
                <BaseDialog
                    onClose={onClose}
                    title={'Base Dialog'}
                    fullWidth={true}
                >
                    something
                </BaseDialog>
            )}
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
