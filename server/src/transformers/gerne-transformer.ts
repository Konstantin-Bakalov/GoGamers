import { GenreModel } from '../models/genre-model';

export class GenreTransformer {
    transform(genre: GenreModel) {
        return {
            name: genre.name,
            id: genre.id,
            createdAt: genre.createdAt,
        };
    }

    transformArray(genre: GenreModel[]) {
        return genre.map((genre) => this.transform(genre));
    }
}
