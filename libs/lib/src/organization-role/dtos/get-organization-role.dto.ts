import { AutoMap } from '@automapper/classes';
import { GetOrganizationDto } from '@lib/organization/dtos/get-organization.dto';
import { GetDto } from '@lib/shared/dtos/get.dto';
import { GetUserDto } from '@lib/user/dtos/get-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { EOrganizationRoleRole } from '../enums/organization-role-role.enum';

export class GetOrganizationRoleDto extends GetDto {
  @ApiProperty()
  @AutoMap()
  Balance: number;

  @ApiProperty({
    enum: EOrganizationRoleRole,
    enumName: 'EOrganizationRoleRole',
  })
  @AutoMap(() => String)
  Role: EOrganizationRoleRole;

  @ApiProperty({ type: GetOrganizationDto })
  @AutoMap(() => GetOrganizationDto)
  Organization: GetOrganizationDto;

  @ApiProperty({ type: GetUserDto })
  @AutoMap(() => GetUserDto)
  User: GetUserDto;
}
