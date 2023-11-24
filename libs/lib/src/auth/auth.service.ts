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
          SupabaseId: payload.sub,
        },
        {
          Email: payload.email,
        },
      ],
    });
    if (!user) {
      // Create new user
      user = await this.userService.createOne(
        crudRequest,
        {
          Email: payload.email ?? '',
          Role: EUserRole.USER,
          Name: payload.name ?? null,
          // AppleId: payload.firebase.identities['apple.com']?.length
          //   ? payload.firebase.identities['apple.com'][0]
          //   : null,
          // AvatarId: null,
          // FacebookId: payload.firebase.identities['facebook.com']?.length
          //   ? payload.firebase.identities['facebook.com'][0]
          //   : null,
          SupabaseId: payload.sub,
          // GoogleId: payload.firebase.identities['google.com']?.length
          //   ? payload.firebase.identities['google.com'][0]
          //   : null,
          // SocialAvatarUrl: payload.picture ?? null,
          OnboardingStatus: EOnboardingStatus.NOT_STARTED,
          Status: EUserStatus.ACTIVE,
        },
        CreateUserDto,
        User,
      );
    } else {
      // Update user values if needed
      user = await this.userService.updateOne(
        crudRequest,
        {
          Email: payload.email,
          Name: user.Name ?? payload.namem,
          // AppleId: payload.firebase.identities['apple.com']?.length
          //   ? payload.firebase.identities['apple.com'][0]
          //   : undefined,
          // FacebookId: payload.firebase.identities['facebook.com']?.length
          //   ? payload.firebase.identities['facebook.com'][0]
          //   : undefined,
          SupabaseId: payload.sub,
          // GoogleId: payload.firebase.identities['google.com']?.length
          //   ? payload.firebase.identities['google.com'][0]
          //   : undefined,
          // SocialAvatarUrl: payload.picture ?? null,
        },
        UpdateUserDto,
        User,
      );
    }
    return user;
  }
}
