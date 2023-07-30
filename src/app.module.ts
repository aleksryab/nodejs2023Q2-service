import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [UserModule, TrackModule, ArtistModule, DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
