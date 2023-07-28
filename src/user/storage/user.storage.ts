import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserStorage {
  private users: User[] = [];

  create(userDto: CreateUserDto): User {
    const newUser: User = {
      id: uuidv4(),
      ...userDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(newUser);
    return newUser;
  }

  getAll(): User[] {
    return this.users;
  }

  getById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getByLogin(login: string): User | undefined {
    return this.users.find((user) => user.login === login);
  }

  updatePassword(id: string, newPassword: string): User | undefined {
    const user = this.getById(id);
    if (!user) return;
    user.password = newPassword;
    return user;
  }

  delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
