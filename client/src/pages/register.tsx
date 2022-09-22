import { Button, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <Container
            component="form"
            maxWidth="sm"
            // onSubmit={trigger}
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

            <Button
                // disabled={loading}
                variant="contained"
                color="primary"
                type="submit"
            >
                Register {/* {loading ? <CircularProgress /> : <>Submit</>} */}
            </Button>
        </Container>
    );
}
