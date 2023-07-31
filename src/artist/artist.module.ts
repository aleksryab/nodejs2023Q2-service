import { Module } from '@nestjs/common';
import { DataModule } from '../data/data.module';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';

@Module({
  imports: [DataModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
