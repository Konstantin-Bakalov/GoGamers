import { Box, IconButton, Tooltip } from '@mui/material';
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
            <Tooltip placement="top" title="Edit">
                <IconButton
                    size="large"
                    aria-label="edit game"
                    onClick={onEdit}
                >
                    <EditIcon color="primary" />
                </IconButton>
            </Tooltip>

            <Tooltip placement="top" title="Delete">
                <IconButton size="large" aria-label="delete" onClick={onDelete}>
                    <DeleteIcon color="primary" />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
