import { Box, Link, Paper, Typography } from '@mui/material';
import { makeStyles } from '../lib/make-styles';
import GitHubIcon from '@mui/icons-material/GitHub';

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
        gap: '1rem',
    },
    text: {
        color: 'background.paper',
    },
    link: {
        display: 'flex',
    },
    icon: {
        color: 'primary.light',
    },
});

export function Footer() {
    return (
        <Box sx={styles.box}>
            <Paper elevation={24} square sx={styles.paper}>
                <Typography sx={styles.text}>
                    Copyright © 2023 Konstantin Bakalov
                </Typography>

                <Link
                    sx={styles.link}
                    href={'https://github.com/Konstantin-Bakalov/Games-Library'}
                    target="_blank"
                >
                    <GitHubIcon sx={styles.icon} />
                </Link>
            </Paper>
        </Box>
    );
}
