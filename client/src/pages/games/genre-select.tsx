import { useAsync } from '../../hooks/use-async';
import { genreService } from '../../services/genre-service';
import Select from 'react-select';
import { Box, FormHelperText } from '@mui/material';

type OptionsType = {
    value: string;
    label: string;
};

export function GenreSelect() {
    const { data: allGenres, loading } = useAsync(() => genreService.all(), []);

    const handleChange = (selectedOption: any) => {
        console.log(selectedOption);
    };

    return (
        <Box>
            <Select
                isMulti
                options={allGenres?.map<OptionsType>((genre) => {
                    return { value: genre.name, label: genre.name };
                })}
                onChange={handleChange}
            />
            <FormHelperText>Select genres</FormHelperText>
        </Box>
    );
}
