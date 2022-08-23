import { GenreModel } from '../models/genre-model';

class GenreService {
    async all() {
        return await GenreModel.query();
    }
}

export default new GenreService();
