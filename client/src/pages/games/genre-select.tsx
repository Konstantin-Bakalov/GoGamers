import { genreService } from '../../services/genre-service';
import { Box } from '@mui/material';
import AsyncCreatableSelect from 'react-select/async-creatable';

type Option = {
    value: string;
    label: string;
};

interface GenreSelectProps {
    onChange: (genres: { name: string }[]) => void;
    defaultGenres?: { name: string }[];
}

export function GenreSelect({ onChange, defaultGenres }: GenreSelectProps) {
    const loadOptions = async (inputValue: string) => {
        return (await genreService.all())
            .map<Option>((genre) => {
                return { value: genre.name, label: genre.name };
            })
            .filter((i) =>
                i.label
                    .toLocaleLowerCase()
                    .includes(inputValue.toLocaleLowerCase()),
            );
    };

    const handleChange = (selectedOptions: readonly Option[]) => {
        const genres = selectedOptions.map((option) => {
            return { name: option.label };
        });

        onChange(genres);
    };

    const transformDefaultGenres = (genres?: { name: string }[]) => {
        return genres?.map((genre) => {
            return { value: genre.name, label: genre.name };
        });
    };

    return (
        <Box>
            <AsyncCreatableSelect
                isMulti
                cacheOptions
                defaultOptions
                defaultValue={transformDefaultGenres(defaultGenres)}
                placeholder={'Select genres *'}
                loadOptions={loadOptions}
                onChange={handleChange}
                styles={{
                    dropdownIndicator: (base) => ({
                        ...base,
                        color: 'primary',
                        ':hover': {
                            color: '#F1EDFF',
                        },
                    }),
                    control: (styles) => ({
                        ...styles,
                        backgroundColor: 'primary',
                        borderRadius: '4px',
                        borderColor: 'primary.main',
                        boxShadow: undefined,
                        borderWidth: 1.5,
                        '&:hover': {
                            borderColor: 'primary.main',
                        },
                    }),
                    clearIndicator: (styles) => ({
                        ...styles,
                        color: 'primary',
                        ':hover': {
                            color: 'red',
                        },
                    }),
                    valueContainer: (styles) => ({
                        ...styles,
                        padding: '14px',
                    }),
                    indicatorSeparator: (styles) => ({
                        ...styles,
                        backgroundColor: '#1A192A',
                    }),
                    input: (styles) => ({
                        ...styles,
                        color: 'primary',
                    }),
                    placeholder: (styles) => ({
                        ...styles,
                        color: 'primary',
                    }),
                }}
            />
        </Box>
    );
}
