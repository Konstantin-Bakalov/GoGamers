import { genreService } from '../../services/genre-service';
import { Box } from '@mui/material';
import AsyncCreatableSelect from 'react-select/async-creatable';

type Option = {
    value: string;
    label: string;
};

interface GenreSelectProps {
    onChange: (genres: { name: string }[]) => void;
}

export function GenreSelect({ onChange }: GenreSelectProps) {
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

    return (
        <Box>
            <AsyncCreatableSelect
                isMulti
                cacheOptions
                defaultOptions
                placeholder={'Select genres'}
                loadOptions={loadOptions}
                onChange={handleChange}
            />
        </Box>
    );
}
