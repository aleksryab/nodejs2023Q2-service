import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DataModule } from '../data/data.module';

@Module({
  imports: [DataModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
