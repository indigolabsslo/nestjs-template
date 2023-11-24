import { AutoMap } from '@automapper/classes';
import { GetOrganizationDto } from '@lib/organization/dtos/get-organization.dto';
import { GetDto } from '@lib/shared/dtos/get.dto';
import { GetUserDto } from '@lib/user/dtos/get-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { EOrganizationUserRole } from '../enums/organization-user-role.enum';

export class GetOrganizationUserDto extends GetDto {
  @ApiProperty()
  @AutoMap()
  Balance: number;

  @ApiProperty({
    enum: EOrganizationUserRole,
    enumName: 'EOrganizationUserRole',
  })
  @AutoMap(() => String)
  Role: EOrganizationUserRole;

  @ApiProperty({ type: GetOrganizationDto })
  @AutoMap(() => GetOrganizationDto)
  Organization: GetOrganizationDto;

  @ApiProperty({ type: GetUserDto })
  @AutoMap(() => GetUserDto)
  User: GetUserDto;
}
