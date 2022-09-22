import {
    Alert,
    Button,
    CircularProgress,
    Container,
    TextField,
} from '@mui/material';
import { FormEvent, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../hooks/use-async-action';
import { authService, InvalidCredentialsError } from '../services/auth-service';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const { trigger, loading, error } = useAsyncAction(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            await authService.login(username, password);

            const currentLocation = location.state as {
                location: string;
            } | null;
            const pathName = currentLocation?.location;
            navigate(pathName ?? '/');
        },
    );

    const errorMessage = useMemo(() => {
        if (!error) {
            return undefined;
        }

        if (error instanceof InvalidCredentialsError) {
            return 'Invalid username or password';
        }

        return 'Something went wrong';
    }, [error]);

    return (
        <Container
            component="form"
            maxWidth="sm"
            onSubmit={trigger}
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

            <>{error && <Alert severity="error">{errorMessage}</Alert>}</>

            <Button
                disabled={loading}
                variant="contained"
                color="primary"
                type="submit"
            >
                {loading ? <CircularProgress /> : <>Submit</>}
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/register')}
            >
                Register
            </Button>
        </Container>
    );
}
