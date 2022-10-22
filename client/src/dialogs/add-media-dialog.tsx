import { BaseDialog } from './base-dialog';

interface AddMediaDialogProps {
    onClose: () => void;
}

export function AddMediaDialog({ onClose }: AddMediaDialogProps) {
    return (
        <BaseDialog
            title="Add Images or Video"
            onClose={onClose}
            fullWidth={true}
        >
            image form
        </BaseDialog>
    );
}
