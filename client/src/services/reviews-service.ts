import { ReviewModelDetailed, ReviewModelRequest } from 'shared';
import { httpService } from './http-service';

class ReviewService {
    async create(review: ReviewModelRequest) {
        return await httpService.post<ReviewModelDetailed>('/reviews', {
            body: review,
        });
    }

    async listAll(gameId: number) {
        return await httpService.get<ReviewModelDetailed[]>(
            `/reviews/${gameId}`,
        );
    }
}

export const reviewService = new ReviewService();
