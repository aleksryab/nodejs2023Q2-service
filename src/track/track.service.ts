import { Injectable } from '@nestjs/common';
import { EntityNotFoundError } from '../errors';
import { EntitiesList } from '../utils/constants';
import { DataService } from '../data/data.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private readonly dataService: DataService) {}

  create(createTrackDto: CreateTrackDto) {
    const newTrack = new TrackEntity(createTrackDto);
    this.dataService.tracks.add(newTrack);
    return newTrack;
  }

  findAll() {
    return this.dataService.tracks.getAll();
  }

  findOne(id: string) {
    const track = this.dataService.tracks.getById(id);
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
    this.dataService.tracks.delete(id);
  }
}
