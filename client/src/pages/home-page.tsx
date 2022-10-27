import { useCallback, useMemo, useState } from 'react';
import { useAsync } from '../hooks/use-async';
import { gameService } from '../services/games-service';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { GameCard } from '../components/game-card';

interface GameLibraryState {
    searchText: string;
    page: string;
}

function stateToParams(state: GameLibraryState): URLSearchParams {
    return new URLSearchParams(
        state.searchText
            ? { searchText: state.searchText, page: state.page }
            : {},
    );
}

function paramsToState(params: URLSearchParams): GameLibraryState {
    return {
        searchText: params.get('searchText') ?? '',
        page: params.get('page') ?? '0',
    };
}

export function Homepage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const state = useMemo(() => paramsToState(searchParams), [searchParams]);

    const { data: games, loading } = useAsync(
        () => gameService.loadGames(state.page, state.searchText),
        [state.searchText],
    );

    const [inputText, setInputText] = useState(state.searchText);
    const [itemsPerPage, setItemsPerPage] = useState('20');

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
        setItemsPerPage(e.target.value);
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

                <Select
                    label="Items per page"
                    value={itemsPerPage}
                    onChange={handleChange}
                >
                    <MenuItem value={'10'}>Ten</MenuItem>
                    <MenuItem value={'20'}>Twenty</MenuItem>
                    <MenuItem value={'30'}>Thirty</MenuItem>
                </Select>
            </Box>

            {loading && <CircularProgress />}

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >
                {(games ?? []).map((game, index) => (
                    <GameCard key={index} game={game} />
                ))}
            </Box>
        </Container>
    );
}
