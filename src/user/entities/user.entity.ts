import { IsUUID, IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class User {
  @IsUUID(4)
  id: string; // uuid v4

  @IsAlphanumeric()
  login: string;

  @IsNotEmpty()
  password: string;

  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
