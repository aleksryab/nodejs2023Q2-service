import { Injectable } from '@nestjs/common';
import { BaseStorage } from '../../utils/BaseStorage';
import { Track } from '../track.interface';

@Injectable()
export class TrackStorage extends BaseStorage<Track> {}
