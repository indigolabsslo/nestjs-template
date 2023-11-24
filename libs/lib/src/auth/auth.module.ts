import { RedisModule } from '@lib/redis/redis.module';
import { UserModule } from '@lib/user/user.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [PassportModule, UserModule, RedisModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
