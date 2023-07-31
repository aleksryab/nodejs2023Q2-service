import { Injectable, ForbiddenException } from '@nestjs/common';
import { EntityConflictError, EntityNotFoundError } from '../errors';
import { DataService } from '../data/data.service';
import { EntitiesList } from '../utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserPassword } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private readonly dataService: DataService) {}

  create(createUserDto: CreateUserDto) {
    const existedUser = this.dataService.users.getOne({
      login: createUserDto.login,
    });
    if (existedUser) throw new EntityConflictError(EntitiesList.User);

    const newUser = new UserEntity(createUserDto);
    this.dataService.users.add(newUser);

    return newUser;
  }

  findAll(): UserEntity[] {
    return this.dataService.users.getAll();
  }

  findOne(id: string): UserEntity {
    const user = this.dataService.users.getById(id);
    if (!user) throw new EntityNotFoundError(EntitiesList.User);
    return user;
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.findOne(id);

    if (user.password !== oldPassword)
      throw new ForbiddenException('oldPassword is wrong');

    const updateUserDto: UpdateUserPassword = {
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    return this.dataService.users.update(id, updateUserDto);
  }

  remove(id: string) {
    const result = this.dataService.users.delete(id);
    if (!result) throw new EntityNotFoundError(EntitiesList.User);
  }
}
