import { Card, Container } from '@mui/material';
import { useAsync } from '../hooks/use-async';
import { reviewService } from '../services/reviews-service';

interface ReviewListProps {
    gameId: number;
}

export function ReviewList({ gameId }: ReviewListProps) {
    const { data } = useAsync(() => reviewService.listAll(gameId), []);

    return (
        <Container>
            {data?.map((review, index) => (
                <Card key={index}>{review.body}</Card>
            ))}
        </Container>
    );
}
