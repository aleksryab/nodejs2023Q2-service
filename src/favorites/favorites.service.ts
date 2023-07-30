import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { EntityNotFoundError, EntityUnprocessableError } from '../errors';
import { EntitiesList } from '../utils/constants';

@Injectable()
export class FavoritesService {
  constructor(private readonly dataService: DataService) {}

  findAll() {
    const artists = this.findFavArtists();
    const tracks = this.findFavTracks();
    const albums = this.findFavAlbums();
    return { artists, tracks, albums };
  }

  findFavArtists() {
    const favArtistsIds = this.dataService.favorites.artists.getAll();
    const artists = this.dataService.artists.getManyByIds(favArtistsIds);
    return artists;
  }

  addArtist(id: string) {
    const artist = this.dataService.artists.getById(id);
    if (!artist) throw new EntityUnprocessableError(EntitiesList.Artist);
    this.dataService.favorites.artists.add(id);
    return true;
  }

  removeArtist(id: string) {
    const result = this.dataService.favorites.artists.delete(id);
    if (result) return true;
    throw new EntityNotFoundError(EntitiesList.Artist);
  }

  findFavTracks() {
    const favTracksIds = this.dataService.favorites.tracks.getAll();
    const tracks = this.dataService.tracks.getManyByIds(favTracksIds);
    return tracks;
  }

  addTrack(id: string) {
    const track = this.dataService.tracks.getById(id);
    if (!track) throw new EntityUnprocessableError(EntitiesList.Track);
    this.dataService.favorites.tracks.add(id);
    return true;
  }

  removeTrack(id: string) {
    const result = this.dataService.favorites.tracks.delete(id);
    if (result) return true;
    throw new EntityNotFoundError(EntitiesList.Track);
  }

  findFavAlbums() {
    const favAlbumsIds = this.dataService.favorites.albums.getAll();
    const tracks = this.dataService.albums.getManyByIds(favAlbumsIds);
    return tracks;
  }

  addAlbum(id: string) {
    const album = this.dataService.albums.getById(id);
    if (!album) throw new EntityUnprocessableError(EntitiesList.Album);
    this.dataService.favorites.albums.add(id);
    return true;
  }

  removeAlbum(id: string) {
    const result = this.dataService.favorites.albums.delete(id);
    if (result) return true;
    throw new EntityNotFoundError(EntitiesList.Album);
  }
}
