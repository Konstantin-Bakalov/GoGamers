import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '../lib/make-styles';

const styles = makeStyles({
    box: {
        martinTop: 'auto',
    },
    paper: {
        backgroundColor: 'primary.main',
        marginTop: '3rem',
        minHeight: '45px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'background.paper',
    },
});

export function Footer() {
    return (
        <Box sx={styles.box}>
            <Paper elevation={24} square sx={styles.paper}>
                <Typography sx={styles.text}>
                    Copyright © 2023 Konstantin Bakalov
                </Typography>
            </Paper>
        </Box>
    );
}
