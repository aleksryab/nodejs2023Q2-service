import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { FavArtistEntity } from '../favorites/entities/favArtist.entity';
import { FavAlbumEntity } from '../favorites/entities/favAlbum.entity';
import { FavTrackEntity } from '../favorites/entities/favTrack.entity';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: false,
  entities: [
    UserEntity,
    ArtistEntity,
    AlbumEntity,
    TrackEntity,
    FavArtistEntity,
    FavAlbumEntity,
    FavTrackEntity,
  ],
  migrationsRun: true,
  migrations: ['dist/database/migrations/*.js'],
};
