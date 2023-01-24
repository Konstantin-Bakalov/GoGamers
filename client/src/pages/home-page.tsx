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
import { makeStyles } from '../lib/make-styles';

export interface FilterState {
    searchText: string;
    page: string;
    maxItems: string;
    orderBy: string;
}

const itemsOptions = [
    { value: '20', label: 'Twenty' },
    { value: '40', label: 'Forty' },
    { value: '60', label: 'Sixty' },
];

const sortOptions = [
    { value: 'Name', label: 'Name' },
    { value: 'Price asc', label: 'Lowest Price' },
    { value: 'Price desc', label: 'Highest Price' },
    { value: 'releaseDate', label: 'Release Date' },
];

function stateToParams(state: FilterState): URLSearchParams {
    return new URLSearchParams({
        searchText: state.searchText,
        page: state.page,
        maxItems: state.maxItems,
        orderBy: state.orderBy,
    });
}

function paramsToState(params: URLSearchParams): FilterState {
    return {
        searchText: params.get('searchText') || '',
        page: params.get('page') || '1',
        maxItems: params.get('maxItems') || '20',
        orderBy: params.get('orderBy') || 'Name',
    };
}

const styles = makeStyles({
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gridAutoRows: '1fr',
        gap: '1rem',
        alignItems: 'start',
    },
});

export function Homepage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const state = useMemo(() => paramsToState(searchParams), [searchParams]);

    const { data, loading } = useAsync(() => gameService.list(state), [state]);

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

    const handleItemsChange = (e: SelectChangeEvent) => {
        setSearchParams(
            stateToParams({
                ...state,
                page: '1',
                maxItems: e.target.value,
            }),
        );
    };

    const handleSortChange = (e: SelectChangeEvent) => {
        setSearchParams(
            stateToParams({
                ...state,
                page: '1',
                orderBy: e.target.value,
            }),
        );
    };

    return (
        <Container disableGutters sx={{ marginTop: '100px' }}>
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
                    <InputLabel>Sort by</InputLabel>
                    <Select
                        label="Sort by"
                        value={state.orderBy}
                        onChange={handleSortChange}
                    >
                        {sortOptions.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl>
                    <InputLabel>Show by</InputLabel>
                    <Select
                        label="Show by"
                        value={state.maxItems}
                        onChange={handleItemsChange}
                    >
                        {itemsOptions.map((option, index) => (
                            <MenuItem key={index} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            {loading && <CircularProgress />}

            <Box sx={styles.cardGrid}>
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
            />
        </Container>
    );
}
