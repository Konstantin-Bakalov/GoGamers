import { httpService } from './http-service';

interface GenreModel {
    id: number;
    name: string;
    createdAt: string;
}

class GenreService {
    async all(searchText?: string) {
        return await httpService.get<GenreModel[]>('/genres');
    }
}

export const genreService = new GenreService();
