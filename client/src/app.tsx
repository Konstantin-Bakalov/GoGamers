import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GamePage } from './pages/games/game-page';
import { GamesLibrary } from './pages/games/games-library';
import { Header } from './components/header';
import { Login } from './pages/login';
import { PrivateOutlet } from './components/private-outlet';
import { CreateGame } from './pages/games/create';
import { CurrentUserProvider } from './hooks/use-current-user';
import { Register } from './pages/register';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ed6c02',
        },
    },
});

export function App() {
    return (
        <ThemeProvider theme={theme}>
            <CurrentUserProvider>
                <BrowserRouter>
                    <CssBaseline>
                        <Header />
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/" element={<PrivateOutlet />}>
                                <Route path="/" element={<GamesLibrary />} />

                                <Route path="/games">
                                    <Route path=":id" element={<GamePage />} />
                                    <Route
                                        path="new"
                                        element={<CreateGame />}
                                    />
                                </Route>
                            </Route>
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </CssBaseline>
                </BrowserRouter>
            </CurrentUserProvider>
        </ThemeProvider>
    );
}
