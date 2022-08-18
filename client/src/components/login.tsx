import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth-service';

export function Login() {
    const [username, setUsername] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const currentLocation = location.state as { location: string } | null;
        const pathName = currentLocation?.location;

        authService.login(username);

        navigate(pathName ?? '/');
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            ></input>
            <button type="submit">Submit</button>
        </form>
    );
}
