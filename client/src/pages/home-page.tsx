import { useCallback, useMemo, useState } from 'react';
import { useAsync } from '../hooks/use-async';
import { gameService } from '../services/games-service';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { GameCard } from '../components/game-card';
import { genreService } from '../services/genre-service';

interface FilterState {
    searchText: string;
    page: string;
    maxItems: string;
}

const options = [
    { value: '20', label: 'Twenty' },
    { value: '40', label: 'Forty' },
    { value: '60', label: 'Sixty' },
];

function stateToParams(state: FilterState): URLSearchParams {
    return new URLSearchParams({
        searchText: state.searchText,
        page: state.page,
        maxItems: state.maxItems,
    });
}

function paramsToState(params: URLSearchParams): FilterState {
    return {
        searchText: params.get('searchText') || '',
        page: params.get('page') || '1',
        maxItems: params.get('maxItems') || '20',
    };
}

export function Homepage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const state = useMemo(() => paramsToState(searchParams), [searchParams]);

    const { data, loading } = useAsync(
        () => gameService.list(state.page, state.maxItems, state.searchText),
        [state],
    );

    const { data: genres } = useAsync(() => genreService.all(), []);

    const [inputText, setInputText] = useState(state.searchText);

    const setSearch = useCallback(
        (searchText: string) => {
            setSearchParams(
                stateToParams({
                    ...state,
                    searchText,
                }),
                { replace: true },
            );
        },
        [state.searchText],
    );

    const handleChange = (e: SelectChangeEvent) => {
        setSearchParams(
            stateToParams({
                ...state,
                maxItems: e.target.value,
            }),
        );
    };

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                }}
            >
                <TextField
                    label="Search"
                    type="search"
                    variant="standard"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />

                <Button
                    variant="contained"
                    onClick={() => setSearch(inputText)}
                >
                    Search
                </Button>

                <FormControl>
                    <InputLabel>Items</InputLabel>
                    <Select
                        label="Items"
                        value={state.maxItems}
                        onChange={handleChange}
                    >
                        {options.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel>Genres</InputLabel>
                    <Select label="Genres" value={'Genres'}>
                        {genres?.map((genre, index) => (
                            <MenuItem key={index} value={genre.name}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {loading && <CircularProgress />}

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >
                {data?.results &&
                    data.results.map((game, index) => (
                        <GameCard key={index} game={game} />
                    ))}
            </Box>

            <Pagination
                count={Math.ceil((data?.total || 0) / Number(state.maxItems))}
                page={Number(state.page)}
                onChange={(e, value) => {
                    setSearchParams({
                        ...state,
                        page: value.toString(),
                    });
                }}
            ></Pagination>
        </Container>
    );
}
