import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const ormConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE,
  autoLoadEntities: true,
  synchronize: false,
  migrations: ['dist/migrations/*.js'],
  entities: ['dist/**/*.entity.js'],
  migrationsRun: true,
} as DataSourceOptions;

const dataSource = new DataSource(ormConfig);

export default dataSource;
