import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserStorage } from './storage/user.storage';
import { UserErrorMessages } from './constants';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userStorage: UserStorage) {}

  create(createUserDto: CreateUserDto) {
    const existedUser = this.userStorage.getByLogin(createUserDto.login);
    if (existedUser) throw new ConflictException(UserErrorMessages.LoginExists);

    const newUser = new UserEntity(createUserDto);
    this.userStorage.add(newUser);

    return newUser;
  }

  findAll(): UserEntity[] {
    const users = this.userStorage.getAll();
    return users;
  }

  findOne(id: string): UserEntity {
    const user = this.userStorage.getById(id);
    if (!user) throw new NotFoundException(UserErrorMessages.NotFound);
    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.userStorage.getById(id);

    if (!user) throw new NotFoundException(UserErrorMessages.NotFound);
    if (user.password !== oldPassword)
      throw new ForbiddenException(UserErrorMessages.WrongPassword);

    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    return user;
  }

  remove(id: string) {
    const user = this.userStorage.getById(id);
    if (!user) throw new NotFoundException(UserErrorMessages.NotFound);
    this.userStorage.delete(id);
  }
}
