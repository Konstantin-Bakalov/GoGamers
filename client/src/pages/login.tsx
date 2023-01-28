import { Alert, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth-service';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import logo from '../images/chest_cartoon.png';
import { makeStyles } from '../lib/make-styles';

const styles = makeStyles({
    picture: {
        alignSelf: 'center',
        objectFit: 'cover',
        objectPosition: 'center',
        height: '700px',
        width: '700px',
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

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        alignSelf: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5rem',
                    }}
                >
                    <Box>
                        <Typography fontWeight={700} variant="h2">
                            Explore the vast
                        </Typography>

                        <Typography
                            fontWeight={700}
                            color="background.paper"
                            variant="h2"
                        >
                            world of gaming
                        </Typography>
                    </Box>

                    <Box>
                        <Typography variant="h6">
                            Your personal library for pc games
                        </Typography>

                        <Typography variant="h6">
                            Create, discover and comment on games
                        </Typography>
                    </Box>

                    <Box>
                        <GoogleLogin
                            onSuccess={async (credentialResponse) => {
                                if (credentialResponse.credential) {
                                    await authService.login(
                                        credentialResponse.credential,
                                    );
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
                </Box>

                <Box sx={styles.picture} component="img" src={logo} />
            </Box>
        </Box>
    );
}
