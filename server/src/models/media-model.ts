import { BaseModel } from './base-model';

export class MediaModel extends BaseModel {
    gameId!: number;
    type!: 'image' | 'video';
    url!: string;

    static get tableName() {
        return 'media';
    }
}
