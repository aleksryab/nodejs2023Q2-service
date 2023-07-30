import { Injectable, ForbiddenException } from '@nestjs/common';
import { EntityConflictError, EntityNotFoundError } from '../errors';
import { EntitiesList } from '../utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserStorage } from './storage/user.storage';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userStorage: UserStorage) {}

  create(createUserDto: CreateUserDto) {
    const existedUser = this.userStorage.getByLogin(createUserDto.login);
    if (existedUser) throw new EntityConflictError(EntitiesList.User);

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
    if (!user) throw new EntityNotFoundError(EntitiesList.User);
    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.findOne(id);

    if (user.password !== oldPassword)
      throw new ForbiddenException('oldPassword is wrong');

    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    return user;
  }

  remove(id: string) {
    const user = this.userStorage.getById(id);
    if (!user) throw new EntityNotFoundError(EntitiesList.User);
    this.userStorage.delete(id);
  }
}
