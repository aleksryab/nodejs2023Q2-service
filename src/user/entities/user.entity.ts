import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { User } from '../interfaces/user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity('user')
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => value.getTime())
  createdAt: number;

  @UpdateDateColumn()
  @Transform(({ value }) => value.getTime())
  updatedAt: number;

  @Exclude()
  @Column()
  password: string;

  constructor(createUserDto: CreateUserDto) {
    Object.assign(this, createUserDto);
  }
}
