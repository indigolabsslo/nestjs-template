import { AutoMap } from '@automapper/classes';
import { GetOrganizationDto } from '@lib/organization/dtos/get-organization.dto';
import { GetDto } from '@lib/shared/dtos/get.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetDemoItemDto extends GetDto {
  @ApiProperty()
  @AutoMap()
  Name: string;

  @ApiProperty({ type: GetOrganizationDto, nullable: true })
  @AutoMap(() => GetOrganizationDto)
  Organization: GetOrganizationDto | null;
}
