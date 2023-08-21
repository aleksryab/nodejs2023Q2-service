import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from '../api/user/entities/user.entity';
import { ArtistEntity } from '../api/artist/entities/artist.entity';
import { AlbumEntity } from '../api/album/entities/album.entity';
import { TrackEntity } from '../api/track/entities/track.entity';
import { FavArtistEntity } from '../api/favorites/entities/favArtist.entity';
import { FavAlbumEntity } from '../api/favorites/entities/favAlbum.entity';
import { FavTrackEntity } from '../api/favorites/entities/favTrack.entity';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  entities: [
    UserEntity,
    ArtistEntity,
    AlbumEntity,
    TrackEntity,
    FavArtistEntity,
    FavAlbumEntity,
    FavTrackEntity,
  ],
  synchronize: false,
  migrationsRun: true,
  migrations: [`dist/database/migrations/*{.ts,.js}`],
};
