import { IsNotEmpty, IsOptional } from 'class-validator';
import { TokenPayload } from '../interfaces/token-payload.interface';

export class RefreshDto {
  @IsNotEmpty()
  refreshToken: string;

  @IsOptional()
  tokenPayload: TokenPayload;
}
