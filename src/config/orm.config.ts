import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: true,
  entities: [UserEntity, ArtistEntity],
  migrations: ['src/database/migrations/*.ts'],
  migrationsRun: true,
};
