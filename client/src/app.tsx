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

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
        },
        secondary: {
            main: '#FF3916',
            light: '#F8371580',
            dark: '#F83715',
            contrastText: '#FFFFFF',
        },
        text: {
            primary: '#34012F',
            secondary: '#695767',
            disabled: 'rgba(0,0,0,0.39)',
        },
        background: {
            default: '#F4F4F4',
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: 'Open Sans',
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
