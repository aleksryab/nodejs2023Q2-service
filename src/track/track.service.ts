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
    const updatedTrack = this.dataService.tracks.update(id, updateTrackDto);
    if (!updatedTrack) throw new EntityNotFoundError(EntitiesList.Track);
    return updatedTrack;
  }

  remove(id: string) {
    const result = this.dataService.tracks.delete(id);
    if (!result) throw new EntityNotFoundError(EntitiesList.Track);
    this.dataService.favorites.tracks.delete(id);
  }
}
