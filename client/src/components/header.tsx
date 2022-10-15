import { AppBar, Avatar, Container, IconButton } from '@mui/material';
import { useCurrentUser } from '../hooks/use-current-user';
import { authService } from '../services/auth-service';

export function Header() {
    const user = useCurrentUser();

    return (
        <AppBar position="static">
            <div>Board Games</div>
            {user && (
                <Container>
                    <span>{user.name}</span>
                    {user.name ? (
                        <button onClick={() => authService.logout()}>
                            Logout
                        </button>
                    ) : null}
                    <IconButton>
                        <Avatar alt="user avatar" src={user.profilePicture} />
                    </IconButton>
                </Container>
            )}
        </AppBar>
    );
}
