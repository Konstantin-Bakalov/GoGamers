import { IconButton } from '@mui/material';
import { SetGameType } from '../pages/games/game-form';
import { ImageForm } from '../pages/games/image-form';
import { BaseDialog } from './base-dialog';
import CloseIcon from '@mui/icons-material/Close';

interface AddMediaDialogProps {
    onClose: () => void;
    onSubmit: SetGameType;
}

export function AddMediaDialog({ onClose, onSubmit }: AddMediaDialogProps) {
    return (
        <BaseDialog
            title="Add Images or Video"
            onClose={onClose}
            fullWidth={true}
        >
            <ImageForm onSubmit={onSubmit} onClose={onClose} />
            <IconButton
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={onClose}
            >
                <CloseIcon />
            </IconButton>
        </BaseDialog>
    );
}
