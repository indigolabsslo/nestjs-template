import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { OrganizationUserModule } from './organization/organization-user/organization-user.module';
import { OrganizationDemoItemModule } from './organization/organization-demo-item/organization-demo-item.module';
import { AllExceptionsFilter } from '@lib/shared/filters/all-exception.filter';
import { ACLGuard } from '@lib/shared/guards/acl/acl.guard';
import { JwtAuthGuard } from '@lib/shared/guards/jwt-auth/jwt-auth.guard';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { LibModule } from '@lib';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MediaModule } from './media/media.module';
import { OrganizationRoleModule } from './organization-role/organization-role.module';

@Module({
  imports: [
    LibModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: parseInt(configService.get<string>('THROTTLE_TTL') ?? '60'),
          limit: parseInt(configService.get<string>('THROTTLE_LIMIT') ?? '60'),
        },
      ],
    }),
    OrganizationModule,
    UserModule,
    OrganizationUserModule,
    OrganizationDemoItemModule,
    MediaModule,
    OrganizationRoleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ACLGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ApiModule {}
