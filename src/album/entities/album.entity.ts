import { BaseEntity } from '../../utils/base.entity';
import { Album } from '../interfaces/album.interface';

export class AlbumEntity extends BaseEntity implements Album {
  id: string;
  name: string;
  year: number;
  artistId: string;

  constructor(partial: Partial<AlbumEntity>) {
    super();
    Object.assign(this, partial);
  }
}
