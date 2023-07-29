import { BaseEntity } from '../../utils/BaseEntity';
import { Track } from '../track.interface';

export class TrackEntity extends BaseEntity implements Track {
  name: string;
  artistId: string | null = null;
  albumId: string | null = null;
  duration: number;

  constructor(partial: Partial<TrackEntity>) {
    super();
    Object.assign(this, partial);
  }
}
