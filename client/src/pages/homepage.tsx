import { useCallback, useMemo, useState } from 'react';
import { useAsync } from '../hooks/use-async';
import { gameService } from '../services/games-service';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { GameCard } from '../components/game-card';

interface GameLibraryState {
    searchText: string;
}

function stateToParams(state: GameLibraryState): URLSearchParams {
    return new URLSearchParams(
        state.searchText ? { searchText: state.searchText } : {},
    );
}

function paramsToState(params: URLSearchParams): GameLibraryState {
    return {
        searchText: params.get('searchText') ?? '',
    };
}

export function Homepage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const state = useMemo(() => paramsToState(searchParams), [searchParams]);

    const { data: games, loading } = useAsync(
        () => gameService.loadGames(state.searchText),
        [state.searchText],
    );

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

    return (
        <Container>
            <Box>
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
