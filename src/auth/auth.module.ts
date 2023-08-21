import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { CryptoService } from '../utils/crypto.service';
import { UserModule } from '../api/user/user.module';
import { UserEntity } from '../api/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({ global: true }),
  ],
  controllers: [AuthController],
  providers: [
    CryptoService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
