import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DataModule } from '../data/data.module';

@Module({
  imports: [DataModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
