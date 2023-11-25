import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RedisService } from '@lib/redis/redis.service';
import { ConfigService } from '@nestjs/config';
import { ERouteParams } from '@lib/shared/enums/route-params.enum';
import { CrudRequest } from '@indigolabs/crud';
import { User } from '@lib/user/user.entity';
import { AuthService } from '../auth.service';
import { AuthPayloadDto } from '../dtos/auth-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private redisService: RedisService,
  ) {
    super({
      secretOrKey: configService.get<string>('SUPABASE_JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: AuthPayloadDto): Promise<any> {
    return this.validateUserFromJwt(payload, {
      options: {
        routes: {
          createOneBase: { returnShallow: false },
          updateOneBase: { allowParamsOverride: true },
        },
        params: {
          [ERouteParams.UserId]: {
            field: 'Id',
            type: 'uuid',
            primary: true,
          },
        },
        query: {
          exclude: [],
        },
      },
      parsed: {
        fields: [],
        paramsFilter: [],
        authPersist: {},
        classTransformOptions: {},
        search: {},
        filter: [],
        or: [],
        join: [],
        sort: [],
        limit: 1,
        offset: 0,
        page: 1,
        cache: 0,
        includeDeleted: 0,
      },
    });
  }

  async validateUserFromJwt(
    payload: AuthPayloadDto,
    crudRequest: CrudRequest,
  ): Promise<User | null> {
    const user = await this.redisService.getCachedOrInvoke(
      'VALIDATED_USER_' + payload.sub,
      () => this.authService.validateUser(payload, crudRequest),
    );
    if (!user) {
      return null;
    }
    return user;
    return null;
  }

  authenticate(req) {
    super.authenticate(req);
  }
}