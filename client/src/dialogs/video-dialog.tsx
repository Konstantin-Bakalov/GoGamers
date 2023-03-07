import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from '@mui/material';
import { Video } from '../components/video';
import ClearIcon from '@mui/icons-material/Clear';
import { makeStyles } from '../lib/make-styles';

interface VideoDialogProps {
    videoUrl: string;
    onClose: () => void;
}

const styles = makeStyles({
    button: {
        position: 'absolute',
        right: 0,
        top: 0,
        '&:hover': {
            color: 'primary.main',
        },
    },
    content: {
        padding: 0,
    },
});

export function VideoDialog({ videoUrl, onClose }: VideoDialogProps) {
    return (
        <Dialog onClose={onClose} open fullWidth>
            <DialogTitle>
                <Typography>Video Preview</Typography>
                <IconButton disableRipple sx={styles.button} onClick={onClose}>
                    <ClearIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={styles.content}>
                <Video videoUrl={videoUrl} controls={true} autoPlay={true} />
            </DialogContent>
        </Dialog>
    );
}
