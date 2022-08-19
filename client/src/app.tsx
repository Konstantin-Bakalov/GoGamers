import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
} from 'react-router-dom';
import { GamePage } from './components/game-page';
import { GamesLibrary } from './components/games-library';
import { Header } from './components/header';
import { Login } from './components/login';
import { PrivateOutlet } from './components/private-outlet';
import { authService, User } from './services/auth-service';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ed6c02',
        },
    },
});

export function App() {
    const [user, setUser] = useState<User | null>(authService.currentUser);

    useEffect(() => {
        authService.setHandler(setUser);

        return () => {
            authService.setHandler(null);
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
                            <Route path="/games/:id" element={<GamePage />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </CssBaseline>
            </BrowserRouter>
        </ThemeProvider>
    );
}
