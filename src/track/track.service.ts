import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';
import { TrackStorage } from './storage/track.storage';
import { EntityNotFoundError } from '../errors';
import { EntitiesList } from '../utils/constants';

@Injectable()
export class TrackService {
  constructor(private readonly trackStorage: TrackStorage) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack = new TrackEntity(createTrackDto);
    this.trackStorage.add(newTrack);
    return newTrack;
  }

  findAll() {
    return this.trackStorage.getAll();
  }

  findOne(id: string) {
    const track = this.trackStorage.getById(id);
    if (!track) throw new EntityNotFoundError(EntitiesList.Track);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    Object.assign(track, updateTrackDto);
    return track;
  }

  remove(id: string) {
    this.findOne(id);
    this.trackStorage.delete(id);
  }
}
