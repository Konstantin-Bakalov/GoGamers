import { Alert, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth-service';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import logo from '../images/controller.png';
import { makeStyles } from '../lib/make-styles';

const styles = makeStyles({
    picture: {
        objectFit: 'cover',
        objectPosition: 'center',
        height: '800px',
        width: '800px',
    },
});

export function Login() {
    const [invalidCredential, setInvalidCredential] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();

    return (
        <Box sx={{ marginTop: '64px' }}>
            {invalidCredential && <Alert>Invalid Credentials</Alert>}
            {loginFailed && <Alert>Login Failed</Alert>}

            <Box sx={{ display: 'flex' }}>
                <Box>
                    <Typography sx={{ fontWeight: 700 }} variant="h2">
                        Your personal
                    </Typography>
                    <Typography
                        sx={{ fontWeight: 700 }}
                        color="background.paper"
                        variant="h2"
                    >
                        gaming library
                    </Typography>
                </Box>

                <Box>
                    <Typography>
                        Discover and store games of all sorts
                    </Typography>
                </Box>

                <Box sx={styles.picture} component="img" src={logo} />
            </Box>

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
