import { Injectable } from '@nestjs/common';
import { BaseStorage } from './base.storage';
import { UserEntity } from '../user/entities/user.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { IdStorage } from './id.storage';

@Injectable()
export class DataService {
  readonly users = new BaseStorage<UserEntity>();
  readonly artists = new BaseStorage<ArtistEntity>();
  readonly tracks = new BaseStorage<TrackEntity>();
  readonly albums = new BaseStorage<AlbumEntity>();
  readonly favorites = {
    artists: new IdStorage<string>(),
    albums: new IdStorage<string>(),
    tracks: new IdStorage<string>(),
  };
}
