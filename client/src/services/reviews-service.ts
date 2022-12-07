import { ReviewModelDetailed, ReviewModelRequest } from 'shared';
import { httpService } from './http-service';

interface LoadReviews {
    results: ReviewModelDetailed[];
    total: number;
}

class ReviewService {
    async create(review: ReviewModelRequest) {
        return await httpService.post<ReviewModelDetailed>('/reviews', {
            body: review,
        });
    }

    async list(gameId: number, page: string) {
        return await httpService.get<LoadReviews>(`/reviews/${gameId}`, {
            query: { page },
        });
    }
}

export const reviewService = new ReviewService();
