import {
    Alert,
    Button,
    CircularProgress,
    Container,
    TextField,
} from '@mui/material';
import { FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService, InvalidCredentialsError } from '../services/auth-service';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(undefined);
        setLoading(true);

        const currentLocation = location.state as { location: string } | null;
        const pathName = currentLocation?.location;

        try {
            await authService.login(username, password);
            navigate(pathName ?? '/');
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                setError('Invalid username or password');
                return;
            }

            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container
            component="form"
            maxWidth="sm"
            onSubmit={onSubmit}
            sx={{ display: 'grid', gap: '10px' }}
        >
            <TextField
                variant="outlined"
                size="small"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                variant="outlined"
                type="password"
                size="small"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button
                disabled={loading}
                variant="contained"
                color="primary"
                type="submit"
            >
                {loading ? <CircularProgress /> : <>Submit</>}
            </Button>
        </Container>
    );
}
