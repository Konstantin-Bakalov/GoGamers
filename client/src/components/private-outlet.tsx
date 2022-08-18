import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { User } from '../services/auth-service';

interface PrivateOutletProps {
    user: User | null;
}

function NavigateToLogin() {
    const location = useLocation();

    return <Navigate to={'/login'} state={{ location: location.pathname }} />;
}

export function PrivateOutlet({ user }: PrivateOutletProps) {
    return user ? <Outlet /> : <NavigateToLogin />;
}
