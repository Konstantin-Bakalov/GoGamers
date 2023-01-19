import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
} from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useCurrentUser } from '../hooks/use-current-user';
import { makeStyles } from '../lib/make-styles';
import { authService } from '../services/auth-service';

const styles = makeStyles({
    header: {
        height: '50px',
        top: 0,
        position: 'fixed',
        zIndex: 2,
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
        <AppBar position="static" sx={styles.header}>
            <Toolbar>
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
