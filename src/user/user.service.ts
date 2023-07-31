import { Injectable, ForbiddenException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityConflictError, EntityNotFoundError } from '../errors';
import { DataService } from '../data/data.service';
import { EntitiesList } from '../utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UpdateUserPassword } from './interfaces/user.interface';

const SALT_ROUNDS = Number(process.env.CRYPT_SALT) || 10;

@Injectable()
export class UserService {
  constructor(private readonly dataService: DataService) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const existedUser = this.dataService.users.getOne({ login });
    if (existedUser) throw new EntityConflictError(EntitiesList.User);

    const newUserData = {
      login,
      password: await bcrypt.hash(password, SALT_ROUNDS),
    };

    const newUser = new UserEntity(newUserData);
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

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = this.findOne(id);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) throw new ForbiddenException('oldPassword is wrong');

    const updateUserDto: UpdateUserPassword = {
      password: await bcrypt.hash(newPassword, SALT_ROUNDS),
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
