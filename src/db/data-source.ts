import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const datSourceOptions = {
  type: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
    entitiesDir: 'src',
  },
  synchronize: process.env.NODE_ENV !== 'production',
  ssl: process.env.NODE_ENV === 'production',
} as DataSourceOptions;

(() => {
  console.log(
    process.env.DB_DIALECT,
    process.env.DB_HOST,
    process.env.DB_PORT,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    process.env.DB_NAME,
  );
})();
