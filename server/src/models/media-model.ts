import { BaseModel } from './base-model';
import { MediaType } from 'shared';

export class MediaModel extends BaseModel {
    gameId!: number;
    type!: MediaType;
    url!: string;

    static get tableName() {
        return 'media';
    }
}
