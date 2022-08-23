import { useCallback, useMemo, useState } from 'react';
import { Game } from './game';
import { useAsync } from '../hooks/useAsync';
import { gameService } from '../services/games-service';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';

interface GameLibraryState {
    searchText: string;
}

function stateToParams(state: GameLibraryState): URLSearchParams {
    return new URLSearchParams(
        state.searchText ? { searchText: state.searchText } : {}
    );
}

function paramsToState(params: URLSearchParams): GameLibraryState {
    return {
        searchText: params.get('searchText') ?? '',
    };
}

export function GamesLibrary() {
    const [searchParams, setSearchParams] = useSearchParams();

    const state = useMemo(() => paramsToState(searchParams), [searchParams]);

    const {
        data: games,
        loading,
        error,
    } = useAsync(
        () => gameService.loadGames(state.searchText),
        [state.searchText]
    );

    const [inputText, setInputText] = useState(state.searchText);

    const setSearch = useCallback(
        (searchText: string) => {
            setSearchParams(
                stateToParams({
                    ...state,
                    searchText,
                }),
                { replace: true }
            );
        },
        [state.searchText]
    );

    return (
        <Container>
            <Box>
                <TextField
                    label="search"
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

            {(games ?? []).map((game, index) => (
                <Game key={index} game={game} />
            ))}
        </Container>
    );
}
