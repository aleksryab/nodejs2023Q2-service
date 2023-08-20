import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../api/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.signUp(createUserDto);
    if (user) return { message: 'User created' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }
}
