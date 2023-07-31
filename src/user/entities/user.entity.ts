import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../utils/base.entity';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

export class UserEntity extends BaseEntity implements User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(createUserDto: CreateUserDto) {
    super();
    Object.assign(this, createUserDto);
    this.version = 1;
    const timestamp = Date.now();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }
}
