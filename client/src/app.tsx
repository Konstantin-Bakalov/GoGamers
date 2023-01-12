import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GamePage } from './pages/game-page';
import { Homepage } from './pages/home-page';
import { Header } from './components/header';
import { PrivateOutlet } from './components/private-outlet';
import { CurrentUserProvider } from './hooks/use-current-user';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Login } from './pages/login';
import { config } from './config';
import { NewGamePage } from './pages/new-game-page';
import { EditGamePage } from './pages/games/edit-game-page';

// const theme = createTheme({
//     palette: {
//         mode: 'dark',
//         primary: {
//             main: '#ed6c02',
//         },
//     },
// });

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FFFFFF',
        },
        secondary: {
            main: '#FF3916', // red for buttons background
            light: '#F8371580',
            dark: '#F83715', // darker red for text inside of white buttons
            contrastText: '#FFFFFF', // white text color inside red buttons
        },
        text: {
            primary: '#34012F', // purple
            secondary: '#695767', // lighter purple for info of auction cards
            disabled: 'rgba(0,0,0,0.39)', // disabled input text in rgba because of the alpha opacity value;
        },
        background: {
            default: '#F4F4F4',
            paper: '#FFFFFF',
        },
        error: {
            main: '#A8042A',
        },
    },
    typography: {
        fontFamily: 'Open Sans',
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'contained' },
                    style: ({ theme: t }) => ({
                        color: t.palette.secondary.contrastText,
                        backgroundColor: t.palette.secondary.main,
                    }),
                },
                {
                    props: { variant: 'text' },
                    style: ({ theme: t }) => ({
                        color: t.palette.secondary.dark,
                    }),
                },
                {
                    props: { variant: 'outlined' },
                    style: ({ theme: t }) => ({
                        color: t.palette.secondary.main,
                        backgroundColor: t.palette.primary.main,
                        borderColor: t.palette.secondary.light,
                    }),
                },
            ],
        },
        MuiTableCell: {
            variants: [
                {
                    props: { variant: 'head' },
                    style: ({ theme: t }) => ({
                        backgroundColor: t.palette.background.default,
                    }),
                },
            ],
        },
        MuiSelect: {
            variants: [
                {
                    props: { variant: 'outlined' },
                    style: {
                        borderRadius: '8px',
                        mixBlendMode: 'multiply',
                        opacity: 1,
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            border: '1px solid #0000009F',
                        },
                    },
                },
            ],
            defaultProps: {
                inputProps: {
                    MenuProps: { disableScrollLock: true },
                },
            },
        },
        MuiFormControl: {
            styleOverrides: {
                root: ({ theme: t }) => ({
                    m: 1,
                    '& label.Mui-focused ': {
                        color: t.palette.text.primary,
                    },
                }),
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: ({ theme: t }) => ({
                    '&.Mui-checked': { color: t.palette.text.primary },
                }),
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                            borderColor: '#0000003F',
                        },
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: () => ({
                    // boxShadow: '0px 3px 10px #400B3014',
                }),
            },
        },
    },
});

export function App() {
    return (
        <GoogleOAuthProvider clientId={config.buttonAPIKey}>
            <ThemeProvider theme={theme}>
                <CurrentUserProvider>
                    <BrowserRouter>
                        <CssBaseline>
                            <Header />
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/" element={<PrivateOutlet />}>
                                    <Route path="/" element={<Homepage />} />

                                    <Route path="/games">
                                        <Route
                                            path=":id"
                                            element={<GamePage />}
                                        />
                                        <Route
                                            path="new"
                                            element={<NewGamePage />}
                                        />
                                        <Route
                                            path=":id/edit"
                                            element={<EditGamePage />}
                                        />
                                    </Route>
                                </Route>
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </CssBaseline>
                    </BrowserRouter>
                </CurrentUserProvider>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
}
