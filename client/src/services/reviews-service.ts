import { ReviewModelDetailed, ReviewModelRequest } from 'shared';
import { PageState } from '../pages/game-page';
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

    async list(gameId: number, state: PageState) {
        return await httpService.get<LoadReviews>(`/reviews/${gameId}`, {
            query: { ...state },
        });
    }
}

export const reviewService = new ReviewService();
