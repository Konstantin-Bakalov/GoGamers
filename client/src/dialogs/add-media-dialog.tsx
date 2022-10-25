import { IconButton } from '@mui/material';
import { ImageForm } from '../pages/games/image-form';
import { BaseDialog } from './base-dialog';
import CloseIcon from '@mui/icons-material/Close';
import { MediaRequestModel } from 'shared';

interface AddMediaDialogProps {
    onClose: () => void;
    onSubmit: (media: MediaRequestModel[]) => void;
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
