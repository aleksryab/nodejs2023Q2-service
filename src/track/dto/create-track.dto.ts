import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Track } from '../track.interface';

export class CreateTrackDto implements Partial<Track> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID(4)
  @IsOptional()
  artistId?: string | null;

  @IsUUID(4)
  @IsOptional()
  albumId?: string | null;

  @IsInt()
  duration: number;
}
