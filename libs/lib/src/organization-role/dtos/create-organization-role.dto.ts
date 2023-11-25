import { AutoMap } from '@automapper/classes';
import { IsValidPermission } from '@lib/shared/validators/is-valid-permission.validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, IsUUID } from 'class-validator';

export class CreateOrganizationRoleDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  name: string;

  @ApiProperty()
  @AutoMap(() => [String])
  @IsArray()
  @IsValidPermission({ each: true })
  permissions: string[];

  @ApiProperty()
  @IsUUID()
  organizationId: string;
}
