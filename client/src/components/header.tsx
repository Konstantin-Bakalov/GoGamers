import { Link } from 'react-router-dom';
import { authService, User } from '../services/auth-service';

interface HeaderProps {
    user: User | null;
}

export function Header({ user }: HeaderProps) {
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
