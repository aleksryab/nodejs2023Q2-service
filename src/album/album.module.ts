import { Module } from '@nestjs/common';
import { DataModule } from '../data/data.module';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  imports: [DataModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
