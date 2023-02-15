import { useCallback, useMemo, useState } from 'react';
import { useAsync } from '../hooks/use-async';
import { gameService } from '../services/games-service';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GameCard } from '../components/game/game-card';
import { makeStyles } from '../lib/make-styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';

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
    { value: 'Price ASC', label: 'Lowest Price' },
    { value: 'Price DESC', label: 'Highest Price' },
    { value: 'release_date', label: 'Release Date' },
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
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        position: 'relative',
        width: '80%',
        marginTop: {
            xs: '109px',
            sm: '64px',
            md: '64px',
            lg: '64px',
            xl: '64px',
        },
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
            xl: 'row',
        },
        alignItems: 'center',
        marginTop: '20px',
        gap: {
            xs: '20px',
        },
    },
    button: {
        display: 'flex',
        alignSelf: 'stretch',
        justifyContent: {
            xs: 'center',
            sm: 'center',
        },
    },
    search: {
        display: 'flex',
        gap: '1rem',
        flexDirection: {
            xs: 'column',
            sm: 'row',
            md: 'row',
            lg: 'row',
            xl: 'row',
        },
    },
    searchIcon: {
        p: 0,
        paddingLeft: '8px',
        paddingTop: '5px',
        display: {
            xs: 'none',
            sm: 'inline-block',
            md: 'inline-block',
            lg: 'inline-block',
            xl: 'inline-block',
        },
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gridAutoRows: '1fr',
        gap: '20px',
        alignItems: 'start',
        marginTop: '20px',
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 1.5,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2,
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderWidth: 2,
            },
        },
    },
    select: {
        '.MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
            borderWidth: 1.5,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
            borderWidth: 2,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'primary.main',
            borderWidth: 2,
        },
    },
    selectLabel: {
        color: 'primary.main',
    },
    pagination: {
        marginTop: 'auto',
        alignSelf: 'center',
        paddingTop: '30px',
    },
});

export function Homepage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const state = useMemo(() => paramsToState(searchParams), [searchParams]);

    const { data, loading } = useAsync(() => gameService.list(state), [state]);

    const [inputText, setInputText] = useState(state.searchText);

    const navigate = useNavigate();

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

    const onSearchClear = () => {
        setInputText('');
        setSearch('');
    };

    return (
        <Container disableGutters maxWidth={false} sx={styles.container}>
            <Box sx={styles.topBar}>
                <Box sx={styles.button}>
                    <Button
                        size="large"
                        variant="contained"
                        onClick={() => navigate('/games/new')}
                    >
                        <AddIcon />
                        <Typography>New game</Typography>
                    </Button>
                </Box>

                <Box sx={styles.search}>
                    <Box sx={{ display: 'flex' }}>
                        <TextField
                            sx={styles.textField}
                            label="Search game"
                            variant="outlined"
                            autoComplete="off"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    setSearch(inputText);
                                }
                            }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        sx={{ p: 0 }}
                                        size="small"
                                        onClick={onSearchClear}
                                    >
                                        <ClearIcon color="primary" />
                                    </IconButton>
                                ),
                            }}
                        />

                        <IconButton
                            sx={styles.searchIcon}
                            disableRipple
                            onClick={() => setSearch(inputText)}
                        >
                            <SearchIcon fontSize="large" color="primary" />
                        </IconButton>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'space-between',
                        }}
                    >
                        <FormControl>
                            <InputLabel sx={styles.selectLabel}>
                                Sort by
                            </InputLabel>
                            <Select
                                sx={styles.select}
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
                            <InputLabel sx={styles.selectLabel}>
                                Show by
                            </InputLabel>
                            <Select
                                sx={styles.select}
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
                </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {loading && <CircularProgress />}
            </Box>

            <Box sx={styles.cardGrid}>
                {data?.results &&
                    data.results.map((game, index) => (
                        <GameCard key={index} game={game} />
                    ))}
            </Box>

            <Pagination
                sx={styles.pagination}
                size="large"
                color="primary"
                shape="rounded"
                variant="outlined"
                count={Math.ceil((data?.total || 0) / Number(state.maxItems))}
                page={Number(state.page)}
                onChange={(_, value) => {
                    setSearchParams({
                        ...state,
                        page: value.toString(),
                    });
                }}
            />
        </Container>
    );
}
