import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { refreshToken } = request.body;

    if (!refreshToken) {
      throw new UnauthorizedException('Authorization required');
    }

    try {
      const { userId, login }: TokenPayload = await this.jwtService.verifyAsync(
        refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      );

      request.body['tokenPayload'] = { userId, login };
    } catch {
      throw new ForbiddenException('Authorization required');
    }
    return true;
  }
}
