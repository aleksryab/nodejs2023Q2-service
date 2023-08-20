import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Artist } from '../interfaces/artist.interface';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
