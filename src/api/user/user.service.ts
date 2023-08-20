import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EntityConflictError, EntityNotFoundError } from '../../errors';
import { EntitiesList } from '../../utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './entities/user.entity';

const SALT_ROUNDS = Number(process.env.CRYPT_SALT) || 10;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;

    const existedUser = await this.userRepository.findOne({ where: { login } });
    if (existedUser) throw new EntityConflictError(EntitiesList.User);

    const newUserData = {
      login,
      password: await bcrypt.hash(password, SALT_ROUNDS),
    };

    const newUser = new UserEntity(newUserData);
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new EntityNotFoundError(EntitiesList.User);
    return user;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;
    const user = await this.findOne(id);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) throw new ForbiddenException('Old password is wrong');

    user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) throw new EntityNotFoundError(EntitiesList.User);
  }
}
