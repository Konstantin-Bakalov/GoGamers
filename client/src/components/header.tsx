import { Link } from 'react-router-dom';
import { useCurrentUser } from '../hooks/use-current-user';
import { authService } from '../services/auth-service';

export function Header() {
    const user = useCurrentUser();

    return (
        <div>
            <div>Board Games</div>
            {user ? (
                <>
                    <span>{user.username}</span>
                    {user.username ? (
                        <button onClick={() => authService.logout()}>
                            Logout
                        </button>
                    ) : null}
                </>
            ) : (
                <Link to="/login">Go to login</Link>
            )}
        </div>
    );
}
