import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Album } from '../interfaces/album.interface';

export class CreateAlbumDto implements Partial<Album> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID(4)
  artistId?: string | null;
}
