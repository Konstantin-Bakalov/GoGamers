import { Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth-service';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';

export function Login() {
    const [invalidCredential, setInvalidCredential] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();

    return (
        // TODO: Remove margin
        <Box sx={{ marginTop: '100px' }}>
            {invalidCredential && <Alert>Invalid Credentials</Alert>}
            {loginFailed && <Alert>Login Failed</Alert>}

            <GoogleLogin
                onSuccess={async (credentialResponse) => {
                    if (credentialResponse.credential) {
                        await authService.login(credentialResponse.credential);
                        navigate('/');
                    } else {
                        setInvalidCredential(true);
                    }
                }}
                onError={() => {
                    setLoginFailed(true);
                }}
            />
        </Box>
    );
}
