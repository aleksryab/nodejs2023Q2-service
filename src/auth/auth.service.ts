import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { CryptoService } from '../utils/crypto.service';
import { CreateUserDto } from '../api/user/dto/create-user.dto';
import { UserService } from '../api/user/user.service';
import { UserEntity } from '../api/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
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

    const payload = { userId: user.id, login: user.login };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
