import { Injectable } from '@nestjs/common';
import { BaseStorage } from './base.storage';
import { UserEntity } from '../user/entities/user.entity';
import { TrackEntity } from '../track/entities/track.entity';

@Injectable()
export class DataService {
  readonly tracks = new BaseStorage<TrackEntity>();
  readonly users = new BaseStorage<UserEntity>();
}
