import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('TYPEORM_HOST'),
  port: configService.getOrThrow<number>('TYPEORM_PORT'),
  username: configService.get<string>('TYPEORM_USERNAME'),
  password: configService.get<string>('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DATABASE'),
  schema: configService.get<string>('TYPEORM_SCHEMA'),
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsRun: configService.get<string>('TYPEORM_MIGRATIONS_RUN') === 'true',
  synchronize: configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true',
  logging: configService.get<string>('TYPEORM_LOGGING') === 'true',
  migrationsTableName: 'migrations',
  extra: {
    max: configService.getOrThrow<number>('TYPEORM_MAX_CONNECTION_POOL_SIZE'),
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
