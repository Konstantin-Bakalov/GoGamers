import { Alert, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth-service';
import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import logo from '../images/chest_cartoon.png';
import { makeStyles } from '../lib/make-styles';

const styles = makeStyles({
    container: {
        height: '100%',
        gap: {
            xs: '3rem',
            sm: '4rem',
        },
        display: 'flex',
        justifyContent: {
            xs: 'flex-start',
            sm: 'flex-start',
            md: 'center',
            lg: 'center',
            xl: 'center',
        },
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
            xl: 'row',
        },
        marginX: {
            md: '20px',
        },
    },
    picture: {
        alignSelf: 'center',
        objectFit: 'cover',
        objectPosition: 'center',
        height: {
            xs: '300px',
            sm: '300px',
            md: '500px',
            lg: '600px',
            xl: '800px',
        },
    },
    font: {
        textAlign: {
            xs: 'center',
            sm: 'center',
            md: 'start',
            lg: 'start',
            xl: 'start',
        },
        lineHeight: 1.2,
        fontWeight: 700,
        fontSize: {
            xs: '2rem',
            sm: '3.75rem',
            md: '2.25rem',
            lg: '3.75rem',
            xl: '3.75rem',
        },
    },
});

export function Login() {
    const [invalidCredential, setInvalidCredential] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const navigate = useNavigate();

    return (
        <Box sx={{ marginTop: '64px', height: '100%' }}>
            {invalidCredential && <Alert>Invalid Credentials</Alert>}
            {loginFailed && <Alert>Login Failed</Alert>}

            <Box sx={styles.container}>
                <Box
                    sx={{
                        alignSelf: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.5rem',
                    }}
                >
                    <Box>
                        <Typography sx={styles.font}>
                            Explore the vast
                        </Typography>

                        <Typography sx={styles.font} color="background.paper">
                            world of gaming
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            textAlign: {
                                xs: 'center',
                                sm: 'center',
                                md: 'start',
                                lg: 'start',
                                xl: 'start',
                            },
                        }}
                    >
                        <Typography variant="h6">
                            Your personal library for pc games
                        </Typography>

                        <Typography variant="h6">
                            Create, discover and comment on games
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            alignSelf: {
                                xs: 'center',
                                sm: 'center',
                                md: 'flex-start',
                                lg: 'flex-start',
                                xl: 'flex-start',
                            },
                        }}
                    >
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
