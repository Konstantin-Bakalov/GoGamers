import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

export function EditGamePage() {
    const { id } = useParams();
    return <Box>{id}</Box>;
}
