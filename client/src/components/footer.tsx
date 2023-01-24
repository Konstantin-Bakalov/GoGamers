import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '../lib/make-styles';

const styles = makeStyles({
    box: {
        martinTop: 'auto',
    },
    paper: {
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
            <Paper square sx={styles.paper}>
                <Typography variant="body1">
                    Copyright © 2023 Konstantin Bakalov
                </Typography>
            </Paper>
        </Box>
    );
}
