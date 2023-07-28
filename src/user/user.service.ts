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
import { omitObjectProps } from '../utils/omitObjectProps';

@Injectable()
export class UserService {
  constructor(private readonly userStorage: UserStorage) {}

  create(createUserDto: CreateUserDto) {
    const existedUser = this.userStorage.getByLogin(createUserDto.login);
    if (existedUser) throw new ConflictException(UserErrorMessages.LoginExists);

    const user = this.userStorage.create(createUserDto);
    return omitObjectProps(user, 'password');
  }

  findAll() {
    const users = this.userStorage.getAll();
    return users.map((user) => omitObjectProps(user, 'password'));
  }

  findOne(id: string) {
    const user = this.userStorage.getById(id);
    if (!user) throw new NotFoundException(UserErrorMessages.NotFound);
    return omitObjectProps(user, 'password');
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

    return omitObjectProps(user, 'password');
  }

  remove(id: string) {
    const user = this.userStorage.getById(id);
    if (!user) throw new NotFoundException(UserErrorMessages.NotFound);
    this.userStorage.delete(id);
  }
}
