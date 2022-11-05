import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { ReactNode } from 'react';

interface BaseDialogProps {
    title: string;
    children: ReactNode;
    fullWidth: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export function BaseDialog({
    title,
    children,
    fullWidth,
    onClose,
    onSubmit,
}: BaseDialogProps) {
    return (
        <Dialog onClose={onClose} open fullWidth={fullWidth}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>No</Button>
                <Button onClick={onSubmit} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
