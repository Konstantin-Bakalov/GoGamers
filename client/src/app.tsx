import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GamePage } from './pages/games/game-page';
import { GamesLibrary } from './pages/games/games-library';
import { Header } from './components/header';
import { Login } from './pages/login';
import { PrivateOutlet } from './components/private-outlet';
import { authService, User } from './services/auth-service';
import { CreateGame } from './pages/games/create';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ed6c02',
        },
    },
});

export function App() {
    const [user, setUser] = useState<User | undefined>(authService.currentUser);

    useEffect(() => {
        authService.setHandler(setUser);

        return () => {
            authService.setHandler(undefined);
        };
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <CssBaseline>
                    <Header user={user} />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<PrivateOutlet user={user} />}>
                            <Route path="/" element={<GamesLibrary />} />

                            <Route path="/games">
                                <Route path=":id" element={<GamePage />} />
                                <Route path="new" element={<CreateGame />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </CssBaseline>
            </BrowserRouter>
        </ThemeProvider>
    );
}
