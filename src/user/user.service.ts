import { Injectable, ForbiddenException } from '@nestjs/common';
import { EntityConflictError, EntityNotFoundError } from '../errors';
import { DataService } from '../data/data.service';
import { EntitiesList } from '../utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';

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
    const users = this.dataService.users.getAll();
    return users;
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

    user.password = newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    return user;
  }

  remove(id: string) {
    const user = this.dataService.users.getById(id);
    if (!user) throw new EntityNotFoundError(EntitiesList.User);
    this.dataService.users.delete(id);
  }
}
