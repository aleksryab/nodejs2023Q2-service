import { BaseEntity } from '../../utils/base.entity';
import { Artist } from '../interfaces/artist.interface';

export class ArtistEntity extends BaseEntity implements Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    super();
    Object.assign(this, partial);
  }
}
