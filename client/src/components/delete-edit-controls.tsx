import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteEditControlsProps {
    onDelete: () => void;
    onEdit: () => void;
}

export function DeleteEditControls({
    onDelete,
    onEdit,
}: DeleteEditControlsProps) {
    return (
        <Box>
            <IconButton size="large" aria-label="delete" onClick={onDelete}>
                <DeleteIcon color="primary" />
            </IconButton>
            <IconButton size="large" aria-label="edit game" onClick={onEdit}>
                <EditIcon color="primary" />
            </IconButton>
        </Box>
    );
}
