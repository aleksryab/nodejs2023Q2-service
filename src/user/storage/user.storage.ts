import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserStorage {
  private users: User[] = [];

  add(user: User) {
    this.users.push(user);
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

  delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
