import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
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
import { Footer } from './components/footer';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1A192A',
            dark: '#464457',
            light: '#F1EDFF',
        },
        secondary: {
            main: '#00C895',
        },
        text: {
            primary: '#1A192A',
        },
        background: {
            default: '#518071',
            paper: '#F1EDFF',
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
                        <CssBaseline />
                        <Header />
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={<PrivateOutlet />}>
                                <Route path="/" element={<Homepage />} />

                                <Route path="/games">
                                    <Route path=":id" element={<GamePage />} />
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
                        <Footer />
                    </BrowserRouter>
                </CurrentUserProvider>
            </ThemeProvider>
        </GoogleOAuthProvider>
    );
}
