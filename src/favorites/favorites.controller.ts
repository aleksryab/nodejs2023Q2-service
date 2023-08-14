import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get('/artist')
  findFavArtists() {
    return this.favoritesService.findFavArtists();
  }

  @Post('/artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.addArtist(id);
    if (result) return { message: 'Artist added to favorites' };
  }

  @Delete('/artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeArtist(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.removeArtist(id);
    if (result) return { message: 'Artist deleted from favorites' };
  }

  @Get('/track')
  findFavTracks() {
    return this.favoritesService.findFavTracks();
  }

  @Post('/track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.addTrack(id);
    if (result) return { message: 'Track added to favorites' };
  }

  @Delete('/track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeTrack(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.removeTrack(id);
    if (result) return { message: 'Track deleted from favorites' };
  }

  @Get('/album')
  findFavAlbums() {
    return this.favoritesService.findFavAlbums();
  }

  @Post('/album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.addAlbum(id);
    if (result) return { message: 'Album added to favorites' };
  }

  @Delete('/album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.favoritesService.removeAlbum(id);
    if (result) return { message: 'Album deleted from favorites' };
  }
}
