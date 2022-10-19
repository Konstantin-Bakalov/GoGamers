import { httpService } from './http-service';
import { GenreModel } from 'shared';

class GenreService {
    async all() {
        return await httpService.get<GenreModel[]>('/genres');
    }
}

export const genreService = new GenreService();
