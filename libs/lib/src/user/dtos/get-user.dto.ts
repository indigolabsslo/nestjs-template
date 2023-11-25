import { AutoMap } from '@automapper/classes';
import { GetMediaDto } from '@lib/media/dtos/get-media.dto';
import { GetOrganizationUserDto } from '@lib/organization-user/dtos/get-organization-user.dto';
import { GetDto } from '@lib/shared/dtos/get.dto';
import { ApiProperty } from '@nestjs/swagger';
import { EOnboardingStatus } from '../enums/onboarding-status.enum';
import { EUserRole } from '../enums/user-role.enum';
import { EUserStatus } from '../enums/user-status.enum';

export class GetUserDto extends GetDto {
  @ApiProperty()
  @AutoMap()
  Email: string;

  @ApiProperty({ nullable: true })
  @AutoMap()
  Name: string | null;

  @ApiProperty({ enum: EUserRole, enumName: 'EUserRole' })
  @AutoMap(() => String)
  Role: EUserRole;

  @ApiProperty({ type: GetMediaDto, nullable: true })
  @AutoMap(() => GetMediaDto)
  Avatar: GetMediaDto | null;

  @ApiProperty({ nullable: true })
  @AutoMap()
  socialAvatarUrl: string | null;

  @ApiProperty({ enum: EOnboardingStatus, enumName: 'EOnboardingStatus' })
  @AutoMap(() => String)
  onboardingStatus: EOnboardingStatus;

  @ApiProperty({ enum: EUserStatus, enumName: 'EUserStatus' })
  @AutoMap(() => String)
  status: EUserStatus;

  @ApiProperty({ type: GetOrganizationUserDto, isArray: true })
  @AutoMap(() => [GetOrganizationUserDto])
  organizationUsers: GetOrganizationUserDto[];
}
