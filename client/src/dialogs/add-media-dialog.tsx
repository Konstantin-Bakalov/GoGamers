import { SetGameType } from '../pages/games/game-form';
import { ImageForm } from '../pages/games/image-form';
import { BaseDialog } from './base-dialog';

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
            <ImageForm onSubmit={onSubmit} />
        </BaseDialog>
    );
}
