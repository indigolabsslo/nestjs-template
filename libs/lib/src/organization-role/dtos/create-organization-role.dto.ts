import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsPositive, IsUUID } from 'class-validator';

export class CreateOrganizationRoleDto {
  @ApiProperty()
  @AutoMap()
  @IsArray()
  @IsPositive()
  permissions: string[];

  @ApiProperty()
  @IsUUID()
  organizationId: string;
}
