import { Button, Container, TextField } from '@mui/material';
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
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </Container>
    );
}
