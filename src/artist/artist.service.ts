import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { EntitiesList } from '../utils/constants';
import { EntityNotFoundError } from '../errors';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly dataService: DataService) {}

  create(createArtistDto: CreateArtistDto) {
    const newArtist = new ArtistEntity(createArtistDto);
    this.dataService.artists.add(newArtist);
    return newArtist;
  }

  findAll() {
    return this.dataService.artists.getAll();
  }

  findOne(id: string) {
    const artist = this.dataService.artists.getById(id);
    if (!artist) throw new EntityNotFoundError(EntitiesList.Artist);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  remove(id: string) {
    this.findOne(id);
    this.dataService.artists.delete(id);
    console.log(this.dataService.tracks.getAll());

    const tracksWithArtist = this.dataService.tracks.getMany({ artistId: id });
    tracksWithArtist.forEach((track) => (track.artistId = null));
  }
}
