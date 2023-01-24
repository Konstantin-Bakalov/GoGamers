import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useCurrentUser } from '../hooks/use-current-user';
import { makeStyles } from '../lib/make-styles';
import { authService } from '../services/auth-service';
import logo from '../images/logo-no-background-resized.png';
import { useNavigate } from 'react-router-dom';

const styles = makeStyles({
    header: {
        position: 'fixed',
        top: 0,
        zIndex: 2,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        cursor: 'pointer',
    },
});

export function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const user = useCurrentUser();
    const theme = useTheme();
    const fullName = useMediaQuery(theme.breakpoints.up('md'));

    const navigate = useNavigate();

    const handleMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        setAnchorEl(null);
        authService.logout();
    };

    return (
        <AppBar position="static" sx={styles.header} elevation={12}>
            <Toolbar sx={styles.toolbar}>
                <Box
                    component="img"
                    src={logo}
                    sx={styles.logo}
                    onClick={() => navigate('/')}
                />

                {user && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={handleMenu}>
                            <Avatar
                                alt="user avatar"
                                src={user.profilePicture}
                            />
                        </IconButton>
                        <Typography>
                            {fullName && `Hi, ${user.name}`}
                            {!fullName && `Hi, ${user.name.split(' ')[0]}`}
                        </Typography>
                        <Menu
                            anchorOrigin={{
                                horizontal: 'center',
                                vertical: 'bottom',
                            }}
                            transformOrigin={{
                                horizontal: -10,
                                vertical: 20,
                            }}
                            keepMounted
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={onLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
}
