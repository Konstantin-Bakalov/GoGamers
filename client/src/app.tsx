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

export function App() {
    const [user, setUser] = useState<User | null>(authService.currentUser);

    useEffect(() => {
        authService.setHandler(setUser);

        return () => {
            authService.setHandler(null);
        };
    }, []);

    return (
        <BrowserRouter>
            <Header user={user} />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateOutlet user={user} />}>
                    <Route path="/" element={<GamesLibrary />} />
                    <Route path="/games/:id" element={<GamePage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
