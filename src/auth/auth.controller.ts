import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../api/user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }
}
