import { Box, CircularProgress, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useAsync } from '../../hooks/use-async';
import { gameService } from '../../services/games-service';

export function GamePage() {
    const { id } = useParams();

    const { data: game, loading } = useAsync(
        () => gameService.loadGameById(Number(id)),
        [id],
    );

    return (
        <Container disableGutters>
            {loading && <CircularProgress />}

            {game && (
                <Box>
                    <Typography>
                        Game: {game.name} id: {game.id}
                    </Typography>
                    {game.genres?.map((genre, index) => (
                        <Box key={index}>{genre.name}</Box>
                    ))}
                    {game.media?.map((media, index) => (
                        <Box
                            key={index}
                            sx={{
                                width: '150px',
                                height: '100px',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                            component="img"
                            placeholder={'image'}
                            src={media.url}
                        ></Box>
                    ))}
                </Box>
            )}
        </Container>
    );
}
