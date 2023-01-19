import { Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '../lib/make-styles';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';

const githubLink = 'https://github.com/Konstantin-Bakalov';

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
        gap: '1rem',
    },
});

export function Footer() {
    return (
        <Box sx={styles.box}>
            <Paper sx={styles.paper}>
                <Typography>Copyright © 2023 Konstantin Bakalov</Typography>

                <Link target="_blank" rel="noopener" href={githubLink}>
                    <GitHubIcon />
                </Link>
            </Paper>
        </Box>
    );
}
