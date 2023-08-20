import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { ArtistModule } from './api/artist/artist.module';
import { AlbumModule } from './api/album/album.module';
import { TrackModule } from './api/track/track.module';
import { FavoritesModule } from './api/favorites/favorites.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ArtistModule,
    AlbumModule,
    TrackModule,
    FavoritesModule,
    TypeOrmModule.forRoot(ormConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
