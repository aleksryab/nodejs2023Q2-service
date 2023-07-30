import { Module } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, DataService],
})
export class UserModule {}
