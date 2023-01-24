import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '../lib/make-styles';

const styles = makeStyles({
    box: {
        martinTop: 'auto',
    },
    paper: {
        width: 'auto',
        marginTop: '3rem',
        minHeight: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export function Footer() {
    return (
        <Box sx={styles.box}>
            <Paper sx={styles.paper}>
                <Typography>Copyright © 2023 Konstantin Bakalov</Typography>
            </Paper>
        </Box>
    );
}
