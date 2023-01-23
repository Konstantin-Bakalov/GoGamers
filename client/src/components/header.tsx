import {
    AppBar,
    Avatar,
    Box,
    CardMedia,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useCurrentUser } from '../hooks/use-current-user';
import { makeStyles } from '../lib/make-styles';
import { authService } from '../services/auth-service';
import Logo from '../images/logo-no-background.png';

const styles = makeStyles({
    header: {
        position: 'fixed',
        top: 0,
        zIndex: 2,
    },
    toolbar: {
        padding: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const user = useCurrentUser();

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
                <CardMedia
                    sx={{
                        height: '60px',
                        width: '300px',
                    }}
                    component="img"
                    image={Logo}
                />

                {user && (
                    <Box>
                        <IconButton onClick={handleMenu}>
                            <Avatar
                                alt="user avatar"
                                src={user.profilePicture}
                            />
                        </IconButton>
                        <Menu
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
