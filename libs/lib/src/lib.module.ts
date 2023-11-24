import { Global, Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { OrganizationUserModule } from './organization-user/organization-user.module';
import { ConfigModule } from '@nestjs/config';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './auth/auth.module';
import { MediaModule } from './media/media.module';
import { PersistenceModule } from './persistence/persistence.module';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
import { DemoItemModule } from './demo-item/demo-item.module';
import { SupabaseModule } from './supabase/supabase.module';
import configValidationSchema from './shared/schemas/config-validation.schema';

@Global()
@Module({
  providers: [],
  exports: [
    AuthModule,
    DemoItemModule,
    MediaModule,
    OrganizationModule,
    OrganizationUserModule,
    PersistenceModule,
    RedisModule,
    UserModule,
    SupabaseModule,
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AuthModule,
    DemoItemModule,
    MediaModule,
    OrganizationModule,
    OrganizationUserModule,
    PersistenceModule,
    RedisModule,
    UserModule,
    SupabaseModule,
  ],
})
export class LibModule {}
