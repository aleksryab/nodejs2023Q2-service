import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavArtistEntity } from './entities/favArtist.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { FavAlbumEntity } from './entities/favAlbum.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { FavTrackEntity } from './entities/favTrack.entity';
import { TrackEntity } from '../track/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavArtistEntity,
      ArtistEntity,
      FavAlbumEntity,
      AlbumEntity,
      FavTrackEntity,
      TrackEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
