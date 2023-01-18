import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '../lib/make-styles';

const styles = makeStyles({
    box: {
        martinTop: 'auto',
    },
    paper: {
        // borderRadius: '0px',
    },
});

export function Footer() {
    return (
        <Box sx={styles.box}>
            <Paper>
                <Typography sx={styles.paper}>Footer Text</Typography>
            </Paper>
        </Box>
    );
}
