import { AutoMap } from '@automapper/classes';
import { GetOrganizationRoleDto } from '@lib/organization-role/dtos/get-organization-role.dto';
import { GetOrganizationDto } from '@lib/organization/dtos/get-organization.dto';
import { GetDto } from '@lib/shared/dtos/get.dto';
import { GetUserDto } from '@lib/user/dtos/get-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetOrganizationUserDto extends GetDto {
  @ApiProperty()
  @AutoMap()
  Balance: number;

  @ApiProperty({ type: GetOrganizationRoleDto })
  @AutoMap(() => GetOrganizationRoleDto)
  OrganizationRole: GetOrganizationRoleDto;

  @ApiProperty({ type: GetOrganizationDto })
  @AutoMap(() => GetOrganizationDto)
  Organization: GetOrganizationDto;

  @ApiProperty({ type: GetUserDto })
  @AutoMap(() => GetUserDto)
  User: GetUserDto;
}
