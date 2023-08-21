import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CryptoService } from '../utils/crypto.service';
import { CreateUserDto } from '../api/user/dto/create-user.dto';
import { UserService } from '../api/user/user.service';
import { UserEntity } from '../api/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private userService: UserService,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  async signIn(loginDto: LoginDto) {
    const { login, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) throw new ForbiddenException('No user with such login');

    const match = await this.cryptoService.compare(password, user.password);
    if (!match) throw new ForbiddenException('Password does not match');

    const payload: TokenPayload = { userId: user.id, login: user.login };
    return await this.generateTokens(payload);
  }

  async refresh(payload: TokenPayload) {
    return await this.generateTokens(payload);
  }

  private async generateTokens(payload: TokenPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      }),

      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
