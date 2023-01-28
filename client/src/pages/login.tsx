import { Alert, Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth-service';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import logo from '../images/chest_cartoon.png';
import { makeStyles } from '../lib/make-styles';
import { useAsyncAction } from '../hooks/use-async-action';

const styles = makeStyles({
    outerContainer: {
        marginTop: '64px',
        height: '100%',
    },
    container: {
        height: '100%',
        gap: {
            xs: '4rem',
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
    textContainer: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '.5rem',
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
            xs: '2.25rem',
            sm: '3.75rem',
            md: '2.25rem',
            lg: '3.75rem',
            xl: '3.75rem',
        },
    },
    button: {
        display: 'flex',
        width: '100%',
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
            lg: 'row',
            xl: 'row',
        },
        gap: '1rem',
        alignSelf: {
            xs: 'center',
            sm: 'center',
            md: 'flex-start',
            lg: 'flex-start',
            xl: 'flex-start',
        },
    },
    textAlign: {
        textAlign: {
            xs: 'center',
            sm: 'center',
            md: 'start',
            lg: 'start',
            xl: 'start',
        },
    },
    alert: {
        borderRadius: '1.5rem',
        width: '150px',
        paddingY: 0,
        alignSelf: 'center',
    },
});

export function Login() {
    const navigate = useNavigate();

    const { trigger, loading, error } = useAsyncAction(
        async (credentialResponse: CredentialResponse) => {
            if (credentialResponse.credential) {
                await authService.login(credentialResponse.credential);
                navigate('/');
            }
        },
    );

    return (
        <Box sx={styles.outerContainer}>
            <Box sx={styles.container}>
                <Box sx={styles.textContainer}>
                    <Box>
                        <Typography sx={styles.font}>
                            Explore the vast
                        </Typography>

                        <Typography sx={styles.font} color="background.paper">
                            world of gaming
                        </Typography>
                    </Box>

                    <Box sx={styles.textAlign}>
                        <Typography variant="h6">
                            Your personal library for pc games
                        </Typography>

                        <Typography variant="h6">
                            Create, discover and comment on games
                        </Typography>
                    </Box>

                    <Box sx={styles.button}>
                        <Box sx={{ alignSelf: 'center' }}>
                            <GoogleLogin shape="pill" onSuccess={trigger} />
                        </Box>
                        {loading && <CircularProgress />}
                        {!!error && (
                            <Alert sx={styles.alert} severity="error">
                                Login failed
                            </Alert>
                        )}
                    </Box>
                </Box>

                <Box sx={styles.picture} component="img" src={logo} />
            </Box>
        </Box>
    );
}
