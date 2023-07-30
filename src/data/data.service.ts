import { Injectable } from '@nestjs/common';
import { BaseStorage } from './base.storage';
import { UserEntity } from '../user/entities/user.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';

@Injectable()
export class DataService {
  readonly users = new BaseStorage<UserEntity>();
  readonly artists = new BaseStorage<ArtistEntity>();
  readonly tracks = new BaseStorage<TrackEntity>();
  readonly albums = new BaseStorage<AlbumEntity>();
}
