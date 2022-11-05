import { Typography } from '@mui/material';
import { BaseDialog } from './base-dialog';

interface DeleteGameDialogProps {
    onClose: () => void;
    onSubmit: () => void;
}

export function DeleteGameDialog({ onClose, onSubmit }: DeleteGameDialogProps) {
    return (
        <BaseDialog
            title="Delete Game"
            fullWidth={true}
            onClose={onClose}
            onSubmit={onSubmit}
        >
            <Typography>
                Would you like to delete this game from your library ?
            </Typography>
        </BaseDialog>
    );
}
