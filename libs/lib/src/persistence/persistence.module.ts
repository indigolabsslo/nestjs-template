import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entities } from './entities';
import { Migrations } from './migrations';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('TYPEORM_HOST'),
        port: configService.getOrThrow<number>('TYPEORM_PORT'),
        username: configService.get<string>('TYPEORM_USERNAME'),
        password: configService.get<string>('TYPEORM_PASSWORD'),
        database: configService.get<string>('TYPEORM_DATABASE'),
        schema: configService.get<string>('TYPEORM_SCHEMA'),
        entities: Entities,
        migrations: Migrations,
        migrationsRun:
          configService.get<string>('TYPEORM_MIGRATIONS_RUN') === 'true',
        synchronize:
          configService.get<string>('TYPEORM_SYNCHRONIZE') === 'true',
        logging: configService.get<string>('TYPEORM_LOGGING') === 'true',
        extra: {
          max: configService.getOrThrow<number>(
            'TYPEORM_MAX_CONNECTION_POOL_SIZE',
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PersistenceModule {}
