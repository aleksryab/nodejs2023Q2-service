import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EntityNotFoundError, EntityUnprocessableError } from '../../errors';
import { EntitiesList } from '../../utils/constants';
import { FavArtistEntity } from './entities/favArtist.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { AlbumEntity } from '../album/entities/album.entity';
import { FavAlbumEntity } from './entities/favAlbum.entity';
import { FavTrackEntity } from './entities/favTrack.entity';
import { TrackEntity } from '../track/entities/track.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavArtistEntity)
    private readonly favArtistRepository: Repository<FavArtistEntity>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
    @InjectRepository(FavAlbumEntity)
    private readonly favAlbumRepository: Repository<FavAlbumEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(FavTrackEntity)
    private readonly favTrackRepository: Repository<FavTrackEntity>,
    @InjectRepository(TrackEntity)
    private readonly trackRepository: Repository<TrackEntity>,
  ) {}

  async findAll() {
    const [artists, tracks, albums] = await Promise.all([
      this.findFavArtists(),
      this.findFavTracks(),
      this.findFavAlbums(),
    ]);
    return { artists, tracks, albums };
  }

  async findFavArtists() {
    const artists = await this.favArtistRepository.find({
      relations: { artist: true },
    });
    return artists.map(({ artist }) => artist);
  }

  async addArtist(id: string) {
    const artist = await this.artistRepository.findOne({ where: { id } });
    if (!artist) throw new EntityUnprocessableError(EntitiesList.Artist);

    await this.favArtistRepository.save({ artistId: id });
    return true;
  }

  async removeArtist(artistId: string) {
    const result = await this.favArtistRepository.delete({ artistId });
    if (result.affected) return true;
    throw new EntityNotFoundError(EntitiesList.Artist);
  }

  async findFavTracks() {
    const tracks = await this.favTrackRepository.find({
      relations: { track: true },
    });
    return tracks.map(({ track }) => track);
  }

  async addTrack(id: string) {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) throw new EntityUnprocessableError(EntitiesList.Track);

    await this.favTrackRepository.save({ trackId: id });
    return true;
  }

  async removeTrack(trackId: string) {
    const result = await this.favTrackRepository.delete({ trackId });
    if (result.affected) return true;
    throw new EntityNotFoundError(EntitiesList.Track);
  }

  async findFavAlbums() {
    const albums = await this.favAlbumRepository.find({
      relations: { album: true },
    });
    return albums.map(({ album }) => album);
  }

  async addAlbum(id: string) {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) throw new EntityUnprocessableError(EntitiesList.Album);

    await this.favAlbumRepository.save({ albumId: id });
    return true;
  }

  async removeAlbum(albumId: string) {
    const result = await this.favAlbumRepository.delete({ albumId });
    if (result.affected) return true;
    throw new EntityNotFoundError(EntitiesList.Album);
  }
}
