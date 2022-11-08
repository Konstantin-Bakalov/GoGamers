import { ReviewModel, ReviewModelRequest } from 'shared';
import { httpService } from './http-service';

class ReviewService {
    async create(review: ReviewModelRequest) {
        return await httpService.post<ReviewModel>('/reviews', {
            body: review,
        });
    }

    async listAll(gameId: number) {
        return await httpService.get<ReviewModel[]>('/reviews');
    }
}

export const reviewService = new ReviewService();
