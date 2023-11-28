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
    configService: ConfigService,
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
            field: 'id',
            type: 'uuid',
            primary: true,
          },
        },
        query: {
          join: {
            image: {
              alias: 'image',
              eager: true,
            },
            organizationUsers: {
              alias: 'organizationUsers',
              eager: true,
            },
            'organizationUsers.organization': {
              alias: 'organizationUsersOrganization',
              eager: true,
            },
            'organizationUsers.organizationRole': {
              alias: 'organizationUsersOrganizationRole',
              eager: true,
            },
          },
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
    // const user = await this.redisService.getCachedOrInvoke(
    //   'VALIDATED_USER_' + payload.sub,
    //   () => this.authService.validateUser(payload, crudRequest),
    // );
    const user = await this.authService.validateUser(payload, crudRequest);
    if (!user) {
      return null;
    }
    return user;
  }
}
