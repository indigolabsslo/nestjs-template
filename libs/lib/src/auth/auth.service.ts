import { CrudRequest } from '@indigolabs/crud';
import { CreateUserDto } from '@lib/user/dtos/create-user.dto';
import { UpdateUserDto } from '@lib/user/dtos/update-user.dto';
import { EOnboardingStatus } from '@lib/user/enums/onboarding-status.enum';
import { EUserRole } from '@lib/user/enums/user-role.enum';
import { EUserStatus } from '@lib/user/enums/user-status.enum';
import { User } from '@lib/user/user.entity';
import { UserService } from '@lib/user/user.service';
import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dtos/auth-payload.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(
    payload: AuthPayloadDto,
    crudRequest: CrudRequest,
  ): Promise<User> {
    let user = await this.userService.findOne({
      where: [
        {
          supabaseId: payload.sub,
        },
        {
          email: payload.email,
        },
      ],
    });
    if (!user) {
      // Create new user
      user = await this.userService.createOne(
        crudRequest,
        {
          email: payload.email ?? '',
          role: EUserRole.USER,
          name: payload.name ?? null,
          // appleId: payload.firebase.identities['apple.com']?.length
          //   ? payload.firebase.identities['apple.com'][0]
          //   : null,
          // avatarId: null,
          // facebookId: payload.firebase.identities['facebook.com']?.length
          //   ? payload.firebase.identities['facebook.com'][0]
          //   : null,
          supabaseId: payload.sub,
          // googleId: payload.firebase.identities['google.com']?.length
          //   ? payload.firebase.identities['google.com'][0]
          //   : null,
          // socialAvatarUrl: payload.picture ?? null,
          onboardingStatus: EOnboardingStatus.NOT_STARTED,
          status: EUserStatus.ACTIVE,
        },
        CreateUserDto,
        User,
      );
    } else {
      // Update user values if needed
      user = await this.userService.updateOne(
        {
          ...crudRequest,
          parsed: {
            ...crudRequest.parsed,
            paramsFilter: [
              ...crudRequest.parsed.paramsFilter,
              { field: 'id', operator: '$eq', value: user.id },
            ],
            search: {
              ...crudRequest.parsed.search,
              $and: [undefined, { id: { $eq: user.id } }, {}] as never,
            },
          },
        },
        {
          email: payload.email,
          name: user.name ?? payload.name,
          // appleId: payload.firebase.identities['apple.com']?.length
          //   ? payload.firebase.identities['apple.com'][0]
          //   : undefined,
          // facebookId: payload.firebase.identities['facebook.com']?.length
          //   ? payload.firebase.identities['facebook.com'][0]
          //   : undefined,
          supabaseId: payload.sub,
          // googleId: payload.firebase.identities['google.com']?.length
          //   ? payload.firebase.identities['google.com'][0]
          //   : undefined,
          // socialAvatarUrl: payload.picture ?? null,
        },
        UpdateUserDto,
        User,
      );
    }
    return user;
  }
}
