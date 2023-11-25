import { AutoMap } from '@automapper/classes';
import { GetOrganizationDto } from '@lib/organization/dtos/get-organization.dto';
import { GetDto } from '@lib/shared/dtos/get.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetOrganizationRoleDto extends GetDto {
  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap(() => [String])
  permissions: string[];

  @ApiProperty({ type: GetOrganizationDto })
  @AutoMap(() => GetOrganizationDto)
  organization: GetOrganizationDto;
}
