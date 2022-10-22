import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ReactNode } from 'react';

interface BaseDialogProps {
    title: string;
    children: ReactNode;
    fullWidth: boolean;
    onClose: () => void;
}

export function BaseDialog({
    title,
    children,
    fullWidth,
    onClose,
}: BaseDialogProps) {
    return (
        <Dialog onClose={onClose} open fullWidth={fullWidth}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
}
