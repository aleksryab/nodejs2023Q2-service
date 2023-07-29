import { Exclude } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user.interface';

export class UserEntity implements User {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    this.id = uuidv4();
    Object.assign(this, partial);
    this.version = 1;
    const timestamp = Date.now();
    this.createdAt = timestamp;
    this.updatedAt = timestamp;
  }
}
