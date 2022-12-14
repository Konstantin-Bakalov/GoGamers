import { Typography } from '@mui/material';
import { BaseDialog } from './base-dialog';

interface EditGameDialogProps {
    onClose: () => void;
    onSubmit: () => void;
}

export function EditGameDialog({ onClose, onSubmit }: EditGameDialogProps) {
    return (
        <BaseDialog
            title="Edit Game"
            fullWidth={true}
            onClose={onClose}
            onSubmit={onSubmit}
        >
            <Typography>Edit game </Typography>
        </BaseDialog>
    );
}
