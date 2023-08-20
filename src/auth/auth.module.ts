import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from '../utils/crypto.service';
import { UserModule } from '../api/user/user.module';
import { UserEntity } from '../api/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [CryptoService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
