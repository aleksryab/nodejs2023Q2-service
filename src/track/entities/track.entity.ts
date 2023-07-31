import { BaseEntity } from '../../utils/base.entity';
import { Track } from '../interfaces/track.interface';

export class TrackEntity extends BaseEntity implements Track {
  id: string;
  name: string;
  artistId: string | null = null;
  albumId: string | null = null;
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    super();
    Object.assign(this, partial);
  }
}
