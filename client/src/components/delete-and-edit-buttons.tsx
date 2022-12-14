import { Box, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface DeleteAndEditButtonsProps {
    onClickDeleteButton: () => void;
    onClickEditButton: () => void;
}

export function DeleteAndEditButtons({
    onClickDeleteButton,
    onClickEditButton,
}: DeleteAndEditButtonsProps) {
    return (
        <Box>
            <IconButton aria-label="delete" onClick={onClickDeleteButton}>
                <DeleteIcon />
            </IconButton>
            <IconButton aria-label="edit" onClick={onClickEditButton}>
                <EditIcon />
            </IconButton>
        </Box>
    );
}
