import { Injectable } from '@nestjs/common';
import { BaseStorage } from '../../utils/BaseStorage';
import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class TrackStorage extends BaseStorage<TrackEntity> {}
