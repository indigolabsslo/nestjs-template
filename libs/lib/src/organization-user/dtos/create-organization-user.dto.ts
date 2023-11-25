import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateOrganizationUserDto {
  @ApiProperty()
  @IsUUID()
  organizationRoleId: string;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsUUID()
  organizationId: string;
}
