import { Module } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';

@Module({
  controllers: [TrackController],
  providers: [TrackService, DataService],
})
export class TrackModule {}
