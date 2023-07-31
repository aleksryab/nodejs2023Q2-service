import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';
import { DataService } from '../data/data.service';
import { EntityNotFoundError } from '../errors';
import { EntitiesList } from '../utils/constants';

@Injectable()
export class AlbumService {
  constructor(private readonly dataService: DataService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new AlbumEntity(createAlbumDto);
    this.dataService.albums.add(newAlbum);
    return newAlbum;
  }

  findAll() {
    return this.dataService.albums.getAll();
  }

  findOne(id: string) {
    const album = this.dataService.albums.getById(id);
    if (!album) throw new EntityNotFoundError(EntitiesList.Album);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = this.dataService.albums.update(id, updateAlbumDto);
    if (!updatedAlbum) throw new EntityNotFoundError(EntitiesList.Album);
    return updatedAlbum;
  }

  remove(id: string) {
    const result = this.dataService.albums.delete(id);
    if (!result) throw new EntityNotFoundError(EntitiesList.Album);

    const tracksWithAlbum = this.dataService.tracks.getMany({ albumId: id });
    tracksWithAlbum.forEach((track) => (track.albumId = null));

    this.dataService.favorites.albums.delete(id);
  }
}
