import { Button, CircularProgress, Container, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../hooks/use-async-action';
import { authService } from '../services/auth-service';
import { userService } from '../services/user-service';

export function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();

    const { trigger, loading, error } = useAsyncAction(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            await userService.register(username, password);

            await authService.login(username, password);

            navigate('/');
        },
    );

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

            <TextField
                variant="outlined"
                type="password"
                size="small"
                label="Repeat Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
            />

            <Button
                disabled={loading}
                variant="contained"
                color="primary"
                type="submit"
            >
                {loading ? <CircularProgress /> : <>Register</>}
            </Button>
        </Container>
    );
}
