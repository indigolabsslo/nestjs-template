import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Entities } from './entities';
import { Migrations } from './migrations';

config();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT ?? '3306'),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  schema: process.env.TYPEORM_SCHEMA,
  entities: Entities,
  migrations: Migrations,
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
  logging: process.env.TYPEORM_LOGGING === 'true',
  extra: {
    max: parseInt(process.env.TYPEORM_MAX_CONNECTION_POOL_SIZE ?? '10'),
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
